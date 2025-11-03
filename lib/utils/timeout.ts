/**
 * Request Timeout Utilities
 * Prevents long-running requests from consuming resources
 */

/**
 * Wrap a promise with a timeout
 * @param promise - The promise to wrap
 * @param timeoutMs - Timeout in milliseconds
 * @param errorMessage - Custom error message
 * @returns Promise that rejects if timeout is exceeded
 */
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage: string = 'Request timeout'
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
    ),
  ]);
}

/**
 * Create an abort signal with timeout
 * @param timeoutMs - Timeout in milliseconds
 * @returns AbortSignal that aborts after timeout
 */
export function createTimeoutSignal(timeoutMs: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller.signal;
}

/**
 * Default timeouts for different operations
 */
export const TIMEOUTS = {
  API_REQUEST: 30000, // 30 seconds for API requests
  SCRAPE: 45000, // 45 seconds for web scraping
  ENRICHMENT: 120000, // 2 minutes for full enrichment
  SEARCH: 30000, // 30 seconds for search operations
  CHAT: 60000, // 1 minute for chat responses
} as const;
