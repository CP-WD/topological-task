export const getWebBaseUrl = () => {
  if (process.env.VERCEL) {
    return process.env.VERCEL_URL;
  }
  return process.env.WEB_BASE_URL;
}
