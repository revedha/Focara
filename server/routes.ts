import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistRegistrationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Waitlist registration endpoint
  app.post("/api/waitlist", async (req, res) => {
    try {
      // Validate request body
      const validationResult = insertWaitlistRegistrationSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: validationResult.error.issues 
        });
      }

      const { firstName, lastName, email } = validationResult.data;

      // Check if email already exists
      const existingRegistration = await storage.getWaitlistRegistrationByEmail(email);
      if (existingRegistration) {
        return res.status(409).json({ 
          message: "This email is already registered for the waitlist" 
        });
      }

      // Create new waitlist registration
      const registration = await storage.createWaitlistRegistration({
        firstName,
        lastName,
        email,
      });

      res.status(201).json({ 
        message: "Successfully added to waitlist", 
        registration: {
          id: registration.id,
          firstName: registration.firstName,
          lastName: registration.lastName,
          email: registration.email,
        }
      });
    } catch (error) {
      console.error("Error creating waitlist registration:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get waitlist count endpoint (optional)
  app.get("/api/waitlist/count", async (req, res) => {
    try {
      const count = await storage.getWaitlistCount();
      res.json({ count });
    } catch (error) {
      console.error("Error getting waitlist count:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
