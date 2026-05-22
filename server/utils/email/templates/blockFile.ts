import { blockReasonMap } from '~~/shared/data/block-reasons'
import type { FileEmail } from '~~/shared/types/file-email'

export const blockFileTemplate = (file: FileEmail, reasonKey: string) => {
  const config = useRuntimeConfig()
  const reasonText = blockReasonMap[reasonKey] ?? 'No specific reason provided'

  return `
    <div style="font-family:Arial,sans-serif;padding:24px;background:#f4f4f5;color:#18181b;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e4e4e7;">

        <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#111827;">
          File access restricted
        </h1>

        <p style="margin:0 0 12px;font-size:15px;color:#374151;">
          Hi${file.userName ? `, ${file.userName}` : ''}.
        </p>

        <p style="margin:0 0 20px;font-size:14px;color:#4b5563;">
          Your file <strong>${file.fileName}</strong> on <strong>${config.public.appName}</strong> has been restricted.
        </p>

        <div style="padding:16px;border-radius:12px;background:#f9fafb;border:1px solid #e5e7eb;margin-bottom:20px;">
          <p style="margin:0 0 6px;font-size:12px;color:#6b7280;text-transform:uppercase;">
            Reason
          </p>
          <p style="margin:0;font-size:14px;color:#111827;">
            ${reasonText}
          </p>
        </div>

        <p style="font-size:13px;color:#6b7280;">
          If you think this is a mistake, contact support.
        </p>

      </div>
    </div>
  `
}
