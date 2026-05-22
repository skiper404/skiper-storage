import { useRuntimeConfig } from '#imports'

import { blockReasonMap } from '~~/shared/data/block-reasons'
import type { FileEmail } from '~~/shared/types/file-email'

export const deleteFileTemplate = (file: FileEmail, reasonKey?: string) => {
  const config = useRuntimeConfig()
  const reasonText = reasonKey ? (blockReasonMap[reasonKey] ?? 'No specific reason provided') : null

  return `
    <div style="font-family:Arial,sans-serif;padding:24px;background:#f4f4f5;color:#18181b;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e4e4e7;">

        <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#111827;">
          File permanently deleted
        </h1>

        <p style="margin:0 0 12px;font-size:15px;color:#374151;">
          Hi${file.userName ? `, ${file.userName}` : ''}.
        </p>

        <p style="margin:0 0 20px;font-size:14px;color:#4b5563;">
          Your file <strong>${file.fileName}</strong> has been permanently removed from <strong>${config.public.appName}</strong>.
        </p>

          <div style="padding:16px;border-radius:12px;background:#f9fafb;border:1px solid #e5e7eb;margin-bottom:20px;">
            <p style="margin:0 0 6px;font-size:12px;color:#6b7280;text-transform:uppercase;">
              Deletion reason
            </p>
            <p style="margin:0;font-size:14px;color:#111827;">
              ${reasonText}
            </p>
          </div>

        <p style="font-size:13px;color:#6b7280;line-height:1.6;">
          If you believe this was a mistake, please contact support for review.
        </p>

      </div>
    </div>
  `
}
