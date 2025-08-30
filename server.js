import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";
import userRoutes from "./routes/users.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  app.use(express.json());
  app.use("/api/user", userRoutes);

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa"
  });

  app.use(vite.middlewares);

  app.use("/", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template = await vite.transformIndexHtml(
        url,
        await vite.fs.readFile(path.resolve(__dirname, "index.html"), "utf-8")
      );
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(5173, () => {
    console.log("SPA server running at http://localhost:5173");
  });
}

createServer();
