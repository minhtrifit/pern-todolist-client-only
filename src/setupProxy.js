const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/tasks", {
      target: "https://pern-todolist-server-only-production.up.railway.app",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/create", {
      target: "https://pern-todolist-server-only-production.up.railway.app",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/delete", {
      target: "https://pern-todolist-server-only-production.up.railway.app",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/complete", {
      target: "https://pern-todolist-server-only-production.up.railway.app",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/edit", {
      target: "https://pern-todolist-server-only-production.up.railway.app",
      changeOrigin: true,
    })
  );
};
