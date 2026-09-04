/**
 * Server-side URL Health Checker
 * Validates whether a live website URL is genuinely online (200 OK)
 * and not rendering raw error pages like "404: DEPLOYMENT_NOT_FOUND".
 */

export interface HealthCheckResult {
  isLive: boolean;
  statusCode?: number;
  reason?: string;
}

const COMMON_ERROR_SIGNATURES = [
  '404: DEPLOYMENT_NOT_FOUND',
  'DEPLOYMENT_NOT_FOUND',
  '404 Page Not Found',
  'Application Error',
  'This site can’t be reached',
  'This site can\'t be reached',
  'Vercel - 404',
  '404 Not Found',
];

export async function validateLiveUrl(url: string | null | undefined): Promise<HealthCheckResult> {
  if (!url || typeof url !== 'string' || !url.startsWith('http')) {
    return { isLive: false, reason: 'Invalid or missing URL' };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout for fast page loads

    // Try HEAD request first
    let res: Response;
    try {
      res = await fetch(url, {
        method: 'HEAD',
        headers: { 'User-Agent': 'Arsya-Portfolio-HealthCheck/1.0' },
        signal: controller.signal,
      });
    } catch {
      // Fallback to GET request if HEAD is rejected by server
      const getController = new AbortController();
      const getTimeoutId = setTimeout(() => getController.abort(), 5000);
      res = await fetch(url, {
        method: 'GET',
        headers: { 'User-Agent': 'Arsya-Portfolio-HealthCheck/1.0' },
        signal: getController.signal,
      });
      clearTimeout(getTimeoutId);
    }

    clearTimeout(timeoutId);

    if (res.status < 200 || res.status >= 300) {
      return { isLive: false, statusCode: res.status, reason: `HTTP status ${res.status}` };
    }

    // Inspect body text for error page signatures if GET response is available
    if (res.headers.get('content-type')?.includes('text/html')) {
      const htmlText = await res.text();
      for (const signature of COMMON_ERROR_SIGNATURES) {
        if (htmlText.includes(signature)) {
          return { isLive: false, statusCode: res.status, reason: `Error signature detected: ${signature}` };
        }
      }
    }

    return { isLive: true, statusCode: res.status };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Network error / Timeout';
    return { isLive: false, reason: message };
  }
}
