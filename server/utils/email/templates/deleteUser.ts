import { User } from '~~/prisma/generated/client'
import { blockReasonMap } from '~~/shared/data/block-reasons'

export const deleteUserTemplate = (user: User, reasonKey: string) => {
  const config = useRuntimeConfig()

  const reasonText = blockReasonMap[reasonKey] ?? 'No specific reason provided'

  return `
    <div style="font-family:Arial,sans-serif;padding:24px;background:#f4f4f5;color:#18181b;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e4e4e7;">

        <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#111827;">
          Account permanently deleted
        </h1>

        <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#374151;">
          Hi${user.username ? `, ${user.username}` : ''}.
        </p>

        <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#4b5563;">
          Your account on <strong>${config.public.appName}</strong> has been permanently removed due to a violation of our platform rules.
        </p>

        <div style="margin:24px 0;padding:16px;border-radius:12px;background:#fef2f2;border:1px solid #fecaca;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;color:#b91c1c;">
            Deletion reason
          </p>

          <p style="margin:0;font-size:15px;color:#111827;">
            ${reasonText}
          </p>
        </div>

        <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#4b5563;">
          All associated files and account data have been removed from the platform.
        </p>

        <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#4b5563;">
          If you believe this action was taken in error, please contact our support team.
        </p>

        <a
          href="mailto:skiper-storage@support.com"
          style="
            display:inline-block;
            padding:12px 18px;
            border-radius:10px;
            background:#111827;
            color:#ffffff;
            text-decoration:none;
            font-size:14px;
            font-weight:600;
          "
        >
          Contact support
        </a>

        <p style="margin:32px 0 0;font-size:13px;color:#9ca3af;">
          © ${new Date().getFullYear()} ${config.app}
        </p>
      </div>
    </div>
  `
}
