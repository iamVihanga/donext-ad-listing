import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: ''
      // }
    ]
  }
};

export default withPlaiceholder(nextConfig);
