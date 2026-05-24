import { User } from '@prisma/client'

const config = useRuntimeConfig()

export const unblockUserTemplate = (user: User) => {
  return `
    <div style="font-family:Arial,sans-serif;padding:24px;background:#f4f4f5;color:#18181b;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e4e4e7;">

        <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#111827;">
          Account access restored
        </h1>

        <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#374151;">
          Hi${user.username ? `, ${user.username}` : ''}.
        </p>

        <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#4b5563;">
          Your account on <strong>${config.public.appName}</strong> has been successfully restored.
        </p>

        <div style="margin:24px 0;padding:16px;border-radius:12px;background:#ecfdf5;border:1px solid #a7f3d0;">
          <p style="margin:0;font-size:15px;color:#065f46;font-weight:600;">
            You now have full access to all platform features again.
          </p>
        </div>

        <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#4b5563;">
          Thank you for your patience and cooperation.
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
