import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // No API routes needed since we're using Formspree
  // Just create and return the HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
