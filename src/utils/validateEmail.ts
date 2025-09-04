/**
 * Validate email format
 * @param email - The email address to validate
 * @returns True if email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate email with additional checks
 * @param email - The email address to validate
 * @returns Object with validation result and error message
 */
export const validateEmailDetailed = (email: string): { isValid: boolean; error?: string } => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  if (email.length > 254) {
    return { isValid: false, error: 'Email is too long' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  // Check for common disposable email domains
  const disposableDomains = [
    'tempmail.org',
    'guerrillamail.com',
    '10minutemail.com',
    'mailinator.com',
    'yopmail.com',
    'throwaway.email',
    'temp-mail.org',
    'fakeinbox.com',
    'sharklasers.com',
    'getairmail.com',
    'mailnesia.com',
    'maildrop.cc',
    'mailmetrash.com',
    'trashmail.com',
    'mailnull.com',
    'spam4.me',
    'bccto.me',
    'chacuo.net',
    'dispostable.com',
    'mailnesia.com',
    'mailinator.net',
    'mailinator2.com',
    'mailinator3.com',
    'mailinator4.com',
    'mailinator5.com',
    'mailinator6.com',
    'mailinator7.com',
    'mailinator8.com',
    'mailinator9.com',
    'mailinator10.com',
  ];

  const domain = email.split('@')[1]?.toLowerCase();
  if (disposableDomains.includes(domain)) {
    return { isValid: false, error: 'Disposable email addresses are not allowed' };
  }

  return { isValid: true };
};

/**
 * Normalize email address (lowercase, trim whitespace)
 * @param email - The email address to normalize
 * @returns Normalized email address
 */
export const normalizeEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

/**
 * Check if email is from a business domain
 * @param email - The email address to check
 * @returns True if email is from a business domain
 */
export const isBusinessEmail = (email: string): boolean => {
  const personalDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'live.com',
    'msn.com',
    'aol.com',
    'icloud.com',
    'me.com',
    'mac.com',
    'protonmail.com',
    'tutanota.com',
    'zoho.com',
    'yandex.com',
    'mail.ru',
    'qq.com',
    '163.com',
    '126.com',
    'sina.com',
    'sohu.com',
  ];

  const domain = email.split('@')[1]?.toLowerCase();
  return !personalDomains.includes(domain);
};

/**
 * Extract domain from email address
 * @param email - The email address
 * @returns The domain part of the email
 */
export const extractEmailDomain = (email: string): string | null => {
  const parts = email.split('@');
  return parts.length === 2 ? parts[1].toLowerCase() : null;
};

/**
 * Generate a simple email validation error message
 * @param email - The email address that failed validation
 * @returns User-friendly error message
 */
export const getEmailValidationMessage = (email: string): string => {
  if (!email) {
    return 'Please enter an email address';
  }

  if (!email.includes('@')) {
    return 'Please include @ in your email address';
  }

  if (!email.includes('.')) {
    return 'Please include a domain in your email address';
  }

  return 'Please enter a valid email address';
};
