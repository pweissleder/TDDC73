export default ({ config }) => {
    return {
      ...config,
      extra: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
      },
    };
  };