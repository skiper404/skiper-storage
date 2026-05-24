import { Token } from '@prisma/client'

const config = useRuntimeConfig()

export const resetPasswordTemplate = (token: Token) => {
  const resetUrl = `${config.public.appUrl}/auth/reset-password?token=${token.token}`

  return `
    <div style="font-family:Arial,sans-serif;padding:24px;background:#f4f4f5;color:#18181b;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e4e4e7;">

        <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#111827;">
          Reset your password
        </h1>

        <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#4b5563;">
          We received a request to reset your password for your account on
          <strong>${config.public.appName}</strong>.
        </p>

        <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#4b5563;">
          Click the button below to continue. This link will expire soon for security reasons.
        </p>

        <a
          href="${resetUrl}"
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
          Reset password
        </a>

        <p style="margin:24px 0 0;font-size:13px;color:#9ca3af;word-break:break-all;">
          If you didn’t request this, you can safely ignore this email.
        </p>

        <p style="margin:24px 0 0;font-size:13px;color:#9ca3af;">
          © ${new Date().getFullYear()} ${config.public.appName}
        </p>
      </div>
    </div>
  `
}
