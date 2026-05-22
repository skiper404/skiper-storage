import { FileEmail } from '~~/shared/types/file-email'

const config = useRuntimeConfig()

export const unblockFileTemplate = (file: FileEmail) => {
  return `
    <div style="font-family:Arial,sans-serif;padding:24px;background:#f4f4f5;color:#18181b;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e4e4e7;">

        <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#111827;">
          File restored
        </h1>

        <p style="margin:0 0 12px;font-size:15px;color:#374151;">
          Hi${file.userName ? `, ${file.userName}` : ''}.
        </p>

        <p style="margin:0 0 20px;font-size:14px;color:#4b5563;">
          Your file <strong>${file.fileName}</strong> has been restored and is accessible again.
        </p>

        <p style="font-size:13px;color:#6b7280;">
          Thanks for using ${config.public.appName}.
        </p>

      </div>
    </div>
  `
}
