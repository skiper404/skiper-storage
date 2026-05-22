export const BLOCK_REASONS = [
  'malware',
  'nsfw_content',
  'copyright_violation',
  'phishing_or_scam',
  'illegal_content',
  'storage_abuse',
  'upload_spam',
  'suspicious_activity'
]

export const blockReasonMap: Record<string, string> = {
  malware: 'Malicious or harmful files',
  nsfw_content: 'Adult or explicit content',
  copyright_violation: 'Pirated or stolen content',
  phishing_or_scam: 'Deceptive or fraudulent files or links',
  illegal_content: 'Content that violates laws or regulations',
  storage_abuse: 'Abusing uploads or storage limits',
  upload_spam: 'Mass or automated file uploads',
  suspicious_activity: 'Unusual or risky user behavior'
}
