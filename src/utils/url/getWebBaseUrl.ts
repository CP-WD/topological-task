export const getWebBaseUrl = () => {
  if (!!process.env.VERCEL) {
    return "https://" + process.env.VERCEL_URL;
  }
  return process.env.WEB_BASE_URL;
};
