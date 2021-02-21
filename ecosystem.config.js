module.exports = {
  apps: [
    {
      script: "dist/app.js",
      watch: ["dist"],
      ignore_watch: ["node_modules"],
      name: "Madali_whatsapp",
      watch_options: {
        followSymlinks: false,
      },
      env_production: {
        NODE_ENV: "development",
      },
    },
  ],
};
