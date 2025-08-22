import { users, waitlistRegistrations, type User, type InsertUser, type WaitlistRegistration, type InsertWaitlistRegistration } from "@shared/schema";
import { db } from "./db";
import { eq, count } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  getWaitlistRegistrationByEmail(email: string): Promise<WaitlistRegistration | undefined>;
  createWaitlistRegistration(insertRegistration: InsertWaitlistRegistration): Promise<WaitlistRegistration>;
  getWaitlistCount(): Promise<number>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getWaitlistRegistrationByEmail(email: string): Promise<WaitlistRegistration | undefined> {
    const [registration] = await db.select().from(waitlistRegistrations).where(eq(waitlistRegistrations.email, email));
    return registration || undefined;
  }

  async createWaitlistRegistration(insertRegistration: InsertWaitlistRegistration): Promise<WaitlistRegistration> {
    const [registration] = await db
      .insert(waitlistRegistrations)
      .values(insertRegistration)
      .returning();
    return registration;
  }

  async getWaitlistCount(): Promise<number> {
    const result = await db.select({ count: count() }).from(waitlistRegistrations);
    return result[0]?.count || 0;
  }
}

export const storage = new DatabaseStorage();