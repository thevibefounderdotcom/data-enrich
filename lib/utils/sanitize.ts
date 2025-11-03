/**
 * Input Sanitization Utilities
 * Prevents XSS, SQL injection, and other malicious inputs
 */

/**
 * Sanitize a string by removing potentially dangerous characters
 * @param input - The string to sanitize
 * @param options - Sanitization options
 * @returns Sanitized string
 */
export function sanitizeString(
  input: string,
  options: {
    allowHtml?: boolean;
    maxLength?: number;
    trim?: boolean;
  } = {}
): string {
  const { allowHtml = false, maxLength = 10000, trim = true } = options;

  if (typeof input !== 'string') {
    return '';
  }

  let sanitized = input;

  // Trim whitespace
  if (trim) {
    sanitized = sanitized.trim();
  }

  // Remove HTML tags if not allowed
  if (!allowHtml) {
    sanitized = sanitized.replace(/<[^>]*>/g, '');
  }

  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '');

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Sanitize an email address
 * @param email - The email to validate and sanitize
 * @returns Sanitized email or empty string if invalid
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') {
    return '';
  }

  const sanitized = email.trim().toLowerCase();

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(sanitized)) {
    return '';
  }

  // Additional validation: check for dangerous characters
  const dangerousChars = /[<>;"'`\\]/;
  if (dangerousChars.test(sanitized)) {
    return '';
  }

  return sanitized;
}

/**
 * Sanitize a URL
 * @param url - The URL to sanitize
 * @returns Sanitized URL or empty string if invalid
 */
export function sanitizeUrl(url: string): string {
  if (typeof url !== 'string') {
    return '';
  }

  const sanitized = url.trim();

  // Only allow http and https protocols
  try {
    const parsed = new URL(sanitized);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }
    return sanitized;
  } catch {
    return '';
  }
}

/**
 * Sanitize a number
 * @param value - The value to sanitize
 * @param options - Number constraints
 * @returns Sanitized number or null if invalid
 */
export function sanitizeNumber(
  value: unknown,
  options: {
    min?: number;
    max?: number;
    allowFloat?: boolean;
  } = {}
): number | null {
  const { min, max, allowFloat = true } = options;

  let num: number;

  if (typeof value === 'number') {
    num = value;
  } else if (typeof value === 'string') {
    num = allowFloat ? parseFloat(value) : parseInt(value, 10);
  } else {
    return null;
  }

  if (isNaN(num) || !isFinite(num)) {
    return null;
  }

  if (min !== undefined && num < min) {
    return min;
  }

  if (max !== undefined && num > max) {
    return max;
  }

  return num;
}

/**
 * Sanitize an object recursively
 * @param obj - The object to sanitize
 * @param depth - Maximum recursion depth
 * @returns Sanitized object
 */
export function sanitizeObject<T extends Record<string, unknown>>(
  obj: T,
  depth: number = 10
): T {
  if (depth <= 0) {
    return obj;
  }

  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    // Sanitize the key
    const sanitizedKey = sanitizeString(key, { allowHtml: false, maxLength: 100 });

    if (!sanitizedKey) {
      continue;
    }

    // Sanitize the value based on type
    if (typeof value === 'string') {
      sanitized[sanitizedKey] = sanitizeString(value);
    } else if (typeof value === 'number') {
      sanitized[sanitizedKey] = sanitizeNumber(value);
    } else if (typeof value === 'boolean') {
      sanitized[sanitizedKey] = value;
    } else if (Array.isArray(value)) {
      sanitized[sanitizedKey] = value.map((item) => {
        if (typeof item === 'object' && item !== null) {
          return sanitizeObject(item as Record<string, unknown>, depth - 1);
        }
        if (typeof item === 'string') {
          return sanitizeString(item);
        }
        return item;
      });
    } else if (typeof value === 'object' && value !== null) {
      sanitized[sanitizedKey] = sanitizeObject(
        value as Record<string, unknown>,
        depth - 1
      );
    } else {
      sanitized[sanitizedKey] = value;
    }
  }

  return sanitized as T;
}

/**
 * Sanitize CSV data
 * @param rows - Array of CSV rows
 * @returns Sanitized CSV data
 */
export function sanitizeCsvData(
  rows: Record<string, unknown>[]
): Record<string, unknown>[] {
  return rows.map((row) => sanitizeObject(row));
}

/**
 * Validate and sanitize field names
 * @param fields - Array of field names
 * @returns Sanitized field names
 */
export function sanitizeFieldNames(fields: string[]): string[] {
  return fields
    .map((field) => sanitizeString(field, { allowHtml: false, maxLength: 200 }))
    .filter((field) => field.length > 0 && field.length <= 200);
}
