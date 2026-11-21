import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === "production";
const DATA_DIR = path.join(__dirname, "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  submittedAt: string;
}

const VALID_PROJECT_TYPES = new Set([
  "Website Development",
  "App Development",
  "Software Solution",
  "UI/UX & Branding",
  "Video Editing",
  "Collaboration / Other",
]);

async function persistInquiry(entry: ContactSubmission): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    let list: ContactSubmission[] = [];
    try {
      const raw = await fs.readFile(INQUIRIES_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) list = parsed;
    } catch {
      list = [];
    }
    list.unshift(entry);
    await fs.writeFile(INQUIRIES_FILE, JSON.stringify(list.slice(0, 200), null, 2), "utf-8");
  } catch (err) {
    console.warn("[Contact API] Could not write inquiry to disk:", err);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "64kb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, timestamp: new Date().toISOString() });
  });

  // Contact form backend endpoint
  app.post("/api/contact", async (req, res) => {
    const body = req.body ?? {};
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const projectType = typeof body.projectType === "string" ? body.projectType.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    const fieldErrors: Record<string, string> = {};
    if (name.length < 2 || name.length > 100) {
      fieldErrors.name = "Please enter your name (2–100 characters).";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) {
      fieldErrors.email = "Please enter a valid email address.";
    }
    if (!VALID_PROJECT_TYPES.has(projectType)) {
      fieldErrors.projectType = "Please select a project type.";
    }
    if (message.length < 10 || message.length > 3000) {
      fieldErrors.message = "Please describe your idea (10–3000 characters).";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return res.status(400).json({
        ok: false,
        error: "Please review the highlighted fields.",
        fieldErrors,
      });
    }

    const submission: ContactSubmission = {
      id: `INQ-${Date.now().toString(36).toUpperCase()}`,
      name,
      email,
      projectType,
      message,
      submittedAt: new Date().toISOString(),
    };

    await persistInquiry(submission);

    return res.status(201).json({
      ok: true,
      id: submission.id,
      submittedAt: submission.submittedAt,
      recipient: "mohitdangi151@gmail.com",
      message: "Your inquiry has been received.",
    });
  });

  if (!IS_PROD) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, "dist");
    app.use(express.static(distDir));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Mohit Dangi portfolio server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
