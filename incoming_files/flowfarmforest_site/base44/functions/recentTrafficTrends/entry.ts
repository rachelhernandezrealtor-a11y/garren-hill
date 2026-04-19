import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

const asArray = (value, key) => {
  if (Array.isArray(value)) return value;
  if (key && Array.isArray(value?.[key])) return value[key];
  return [];
};

const parseDateLabel = (yyyymmdd) => {
  if (!yyyymmdd || yyyymmdd.length !== 8) return yyyymmdd;
  return `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;
};

const normalizeDomain = (value = '') => value.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '').toLowerCase();

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json().catch(() => ({}));
    const measurementId = payload?.measurementId || 'G-1MM29NQW5B';
    const websiteUrl = payload?.websiteUrl || 'flowfarmforest.com';
    const propertyIdOverride = payload?.propertyId || null;
    const searchName = (payload?.searchName || 'flow farm').toLowerCase();
    const normalizedWebsiteUrl = normalizeDomain(websiteUrl);

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('google_analytics');
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    let matchedProperty = propertyIdOverride ? {
      property: `properties/${propertyIdOverride}`,
      displayName: 'Flow Farm Forest',
    } : null;
    let matchedStream = null;

    if (!matchedProperty) {
      const summariesResponse = await fetch('https://analyticsadmin.googleapis.com/v1beta/accountSummaries?pageSize=200', { headers });
      const summariesData = await summariesResponse.json();

      if (!summariesResponse.ok) {
        return Response.json({ error: summariesData.error?.message || 'Failed to load Google Analytics properties' }, { status: 500 });
      }

      const accountSummaries = asArray(summariesData, 'accountSummaries');

      for (const account of accountSummaries) {
        const propertySummaries = asArray(account, 'propertySummaries');

        for (const property of propertySummaries) {
          const dataStreamsResponse = await fetch(`https://analyticsadmin.googleapis.com/v1beta/${property.property}:dataStreams`, { headers });
          const dataStreamsData = await dataStreamsResponse.json();
          const dataStreams = asArray(dataStreamsData, 'dataStreams');

          const stream = dataStreams.find((item) => {
            const streamMeasurementId = item?.webStreamData?.measurementId;
            const defaultUri = normalizeDomain(item?.webStreamData?.defaultUri || '');
            const streamName = (item?.displayName || '').toLowerCase();
            const propertyName = (property?.displayName || '').toLowerCase();

            return streamMeasurementId === measurementId ||
              (defaultUri && defaultUri.includes(normalizedWebsiteUrl)) ||
              streamName.includes(searchName) ||
              propertyName.includes(searchName);
          });

          if (stream) {
            matchedProperty = property;
            matchedStream = stream;
            break;
          }
        }

        if (matchedProperty) break;
      }

      if (!matchedProperty) {
        const allProperties = accountSummaries.flatMap((account) => asArray(account, 'propertySummaries'));
        const fallbackProperty = allProperties.find((property) => (property?.displayName || '').toLowerCase().includes(searchName));

        if (fallbackProperty) {
          matchedProperty = fallbackProperty;
        } else if (allProperties.length === 1) {
          matchedProperty = allProperties[0];
        } else {
          return Response.json({
            error: 'Could not find a GA4 property for this website',
            measurementId,
            websiteUrl,
            available_properties: allProperties.map((property) => ({
              property: property.property,
              display_name: property.displayName,
            })),
          }, { status: 404 });
        }
      }
    }

    const propertyId = matchedProperty.property.split('/')[1];
    const reportResponse = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'date' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'newUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' },
        ],
        orderBys: [{ dimension: { dimensionName: 'date' } }],
      }),
    });

    const reportData = await reportResponse.json();

    if (!reportResponse.ok) {
      return Response.json({ error: reportData.error?.message || 'Failed to load traffic trends' }, { status: 500 });
    }

    const rows = asArray(reportData, 'rows');
    const dailyTrends = rows.map((row) => ({
      date: parseDateLabel(row.dimensionValues?.[0]?.value),
      active_users: Number(row.metricValues?.[0]?.value || 0),
      new_users: Number(row.metricValues?.[1]?.value || 0),
      sessions: Number(row.metricValues?.[2]?.value || 0),
      page_views: Number(row.metricValues?.[3]?.value || 0),
    }));

    const totals = dailyTrends.reduce((acc, day) => ({
      active_users: acc.active_users + day.active_users,
      new_users: acc.new_users + day.new_users,
      sessions: acc.sessions + day.sessions,
      page_views: acc.page_views + day.page_views,
    }), {
      active_users: 0,
      new_users: 0,
      sessions: 0,
      page_views: 0,
    });

    return Response.json({
      property_id: propertyId,
      property_name: matchedProperty.displayName,
      measurement_id: matchedStream?.webStreamData?.measurementId || measurementId,
      website_url: matchedStream?.webStreamData?.defaultUri || websiteUrl,
      totals,
      daily_trends: dailyTrends,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});