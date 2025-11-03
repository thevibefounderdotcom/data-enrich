/**
 * Email Domain Categorization
 * Helps users save API credits by filtering out unwanted email types
 */

/**
 * Common personal email domains (free email providers)
 * These are typically individual users, not company contacts
 */
export const PERSONAL_EMAIL_DOMAINS = new Set([
  // Major providers
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'me.com',
  'mac.com',

  // Yahoo variants
  'yahoo.co.uk',
  'yahoo.ca',
  'yahoo.co.in',
  'yahoo.com.au',
  'yahoo.fr',
  'yahoo.de',
  'yahoo.it',
  'yahoo.es',
  'ymail.com',
  'rocketmail.com',

  // Outlook/Hotmail variants
  'live.com',
  'msn.com',
  'outlook.fr',
  'outlook.de',
  'outlook.es',
  'outlook.it',
  'outlook.co.uk',
  'outlook.com.au',
  'hotmail.co.uk',
  'hotmail.fr',
  'hotmail.de',
  'hotmail.es',
  'hotmail.it',

  // AOL
  'aol.com',
  'aim.com',

  // Other popular providers
  'protonmail.com',
  'proton.me',
  'mail.com',
  'gmx.com',
  'gmx.de',
  'zoho.com',
  'yandex.com',
  'yandex.ru',
  'qq.com',
  '163.com',
  '126.com',
  'mail.ru',
  'inbox.com',
  'fastmail.com',
  'hushmail.com',
  'tutanota.com',
  'runbox.com',
  'mailfence.com',
  'posteo.de',
  'disroot.org',

  // Temporary/disposable email providers
  'tempmail.com',
  'guerrillamail.com',
  '10minutemail.com',
  'throwaway.email',
  'mailinator.com',
]);

export type EmailDomainType = 'personal' | 'company' | 'invalid';

export interface EmailCategorization {
  email: string;
  domain: string;
  type: EmailDomainType;
}

export interface DomainBreakdown {
  personal: EmailCategorization[];
  company: EmailCategorization[];
  invalid: EmailCategorization[];
  totalPersonal: number;
  totalCompany: number;
  totalInvalid: number;
  total: number;
}

/**
 * Extract domain from email address
 */
export function extractDomain(email: string): string {
  const parts = email.toLowerCase().trim().split('@');
  return parts.length === 2 ? parts[1] : '';
}

/**
 * Categorize a single email address
 */
export function categorizeEmail(email: string): EmailCategorization {
  if (!email || typeof email !== 'string') {
    return {
      email: email || '',
      domain: '',
      type: 'invalid',
    };
  }

  const trimmedEmail = email.trim();
  const domain = extractDomain(trimmedEmail);

  if (!domain) {
    return {
      email: trimmedEmail,
      domain: '',
      type: 'invalid',
    };
  }

  const type = PERSONAL_EMAIL_DOMAINS.has(domain) ? 'personal' : 'company';

  return {
    email: trimmedEmail,
    domain,
    type,
  };
}

/**
 * Categorize an array of email addresses and return breakdown
 */
export function categorizeEmails(emails: string[]): DomainBreakdown {
  const personal: EmailCategorization[] = [];
  const company: EmailCategorization[] = [];
  const invalid: EmailCategorization[] = [];

  emails.forEach((email) => {
    const categorization = categorizeEmail(email);

    switch (categorization.type) {
      case 'personal':
        personal.push(categorization);
        break;
      case 'company':
        company.push(categorization);
        break;
      case 'invalid':
        invalid.push(categorization);
        break;
    }
  });

  return {
    personal,
    company,
    invalid,
    totalPersonal: personal.length,
    totalCompany: company.length,
    totalInvalid: invalid.length,
    total: emails.length,
  };
}

/**
 * Get unique domains from an array of emails
 */
export function getUniqueDomains(emails: EmailCategorization[]): Map<string, number> {
  const domainCounts = new Map<string, number>();

  emails.forEach(({ domain }) => {
    if (domain) {
      domainCounts.set(domain, (domainCounts.get(domain) || 0) + 1);
    }
  });

  return domainCounts;
}

/**
 * Format domain breakdown for display
 */
export function formatDomainBreakdown(breakdown: DomainBreakdown): string {
  const lines: string[] = [];

  if (breakdown.totalPersonal > 0) {
    lines.push(`Personal emails (Gmail, Yahoo, etc.): ${breakdown.totalPersonal}`);
  }

  if (breakdown.totalCompany > 0) {
    lines.push(`Company emails (custom domains): ${breakdown.totalCompany}`);
  }

  if (breakdown.totalInvalid > 0) {
    lines.push(`Invalid emails: ${breakdown.totalInvalid}`);
  }

  return lines.join(' | ');
}

/**
 * Check if an email should be enriched based on filter settings
 */
export function shouldEnrichEmail(
  email: string,
  filter: {
    includePersonal: boolean;
    includeCompany: boolean;
  }
): boolean {
  const categorization = categorizeEmail(email);

  if (categorization.type === 'invalid') {
    return false;
  }

  if (categorization.type === 'personal' && !filter.includePersonal) {
    return false;
  }

  if (categorization.type === 'company' && !filter.includeCompany) {
    return false;
  }

  return true;
}
