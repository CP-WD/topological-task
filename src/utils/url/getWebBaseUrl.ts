export const getWebBaseUrl = () => {
  console.log(process.env.VERCEL);
  console.log(process.env.VERCEL_URL);
  console.log(process.env.WEB_BASE_URL);
  if (process.env.VERCEL) {
    return process.env.VERCEL_URL;
  }
  return process.env.WEB_BASE_URL;
};
