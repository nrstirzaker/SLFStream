import express from "express";
import fs from "fs";
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  let content = fs.readFileSync("/public/index.html", "utf8");
  res.send(content);
});

app.use((req, res) => {
  res.status(404).send(`You don't have the right to access to this file`);
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}/`);
});

process.on("SIGTERM", () => {
  console.log("Stopping server...");
  server.close(() => {
    console.log("Server stopped.");
    process.exit(0);
  });
});
