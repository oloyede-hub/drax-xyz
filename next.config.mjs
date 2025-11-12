/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  // Enable SWC styled-components transform so styles are extracted server-side
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
