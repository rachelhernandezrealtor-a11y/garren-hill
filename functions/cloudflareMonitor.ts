import { base44 } from '@base44/sdk';

const CF_ACCOUNT_ID = 'fe5ca314e7aea9294d866b1fb475da29';
const SITES = ['flowfarm-landing', 'garren-hill'];

interface DeploymentStage {
  name: string;
  status: string;
  started_on?: string;
  ended_on?: string;
}

interface Deployment {
  id: string;
  created_on: string;
  latest_stage?: DeploymentStage;
  url?: string;
}

interface CFResponse {
  success: boolean;
  result?: Deployment[] | null;
  errors?: Array<{ message: string }>;
}

async function checkCloudflareStatus() {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!token) throw new Error('CLOUDFLARE_API_TOKEN not set');

  const failures: Array<{ site: string; status: string; error?: string }> = [];

  for (const site of SITES) {
    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/pages/projects/${site}/deployments?per_page=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = (await res.json()) as CFResponse;

      if (!data.success) {
        failures.push({
          site,
          status: 'api_error',
          error: data.errors?.[0]?.message || 'Unknown API error',
        });
        continue;
      }

      const deployment = data.result?.[0];
      if (!deployment) {
        failures.push({
          site,
          status: 'no_deployment',
          error: 'No recent deployment found',
        });
        continue;
      }

      const stage = deployment.latest_stage;
      if (stage?.status === 'failed') {
        failures.push({
          site,
          status: 'build_failed',
          error: `Build stage: ${stage.name}`,
        });
      } else if (stage?.status === 'success') {
        console.log(`[cloudflareMonitor] OK: ${site} - ${stage.name} successful`);
      }
    } catch (err) {
      failures.push({
        site,
        status: 'error',
        error: String(err),
      });
    }
  }

  return {
    timestamp: new Date().toISOString(),
    all_healthy: failures.length === 0,
    failures,
  };
}

export default async function cloudflareMonitor() {
  const status = await checkCloudflareStatus();

  if (!status.all_healthy) {
    console.log('[cloudflareMonitor] FAILURES:', JSON.stringify(status.failures));
    return {
      success: false,
      message: 'Build failures detected',
      failures: status.failures,
    };
  }

  console.log('[cloudflareMonitor] All sites healthy');
  return {
    success: true,
    message: 'All Cloudflare Pages projects building successfully',
  };
}
