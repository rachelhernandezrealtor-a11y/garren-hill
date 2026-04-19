import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { token, functionsVersion, appBaseUrl } = appParams;

export const base44 = createClient({
  appId: "69e248a2469cc39540781cce",
  token,
  functionsVersion,
  requiresAuth: false,
  appBaseUrl
});
