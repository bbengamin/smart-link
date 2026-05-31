import { pgTable, varchar, text, timestamp, boolean, integer, jsonb, uuid } from "drizzle-orm/pg-core";

export const businesses = pgTable("businesses", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 200 }),
  website: text("website"),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }),
  zip: varchar("zip", { length: 20 }),
  category: varchar("category", { length: 100 }).notNull(), // e.g., "barbershop", "salon"
  hours: jsonb("hours"), // { mon: { open: "09:00", close: "18:00" }, ... }
  logo_url: text("logo_url"),
  photos: jsonb("photos"), // [{ url, alt }]
  services: jsonb("services"), // [{ name, price, duration }]
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  supabase_id: text("supabase_id").notNull().unique(),
  email: varchar("email", { length: 200 }).notNull(),
  full_name: varchar("full_name", { length: 200 }),
  business_id: uuid("business_id").references(() => businesses.id),
  role: varchar("role", { length: 20 }).default("owner"), // owner, staff, admin
  created_at: timestamp("created_at").defaultNow(),
});

export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  business_id: uuid("business_id").references(() => businesses.id).notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  price: integer("price").notNull(), // in cents
  duration_minutes: integer("duration_minutes").notNull(),
  category: varchar("category", { length: 100 }),
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  business_id: uuid("business_id").references(() => businesses.id).notNull(),
  customer_name: varchar("customer_name", { length: 200 }).notNull(),
  customer_phone: varchar("customer_phone", { length: 20 }),
  customer_email: varchar("customer_email", { length: 200 }),
  service_name: varchar("service_name", { length: 200 }).notNull(),
  service_price: integer("service_price").notNull(),
  date: timestamp("date").notNull(),
  notes: text("notes"),
  status: varchar("status", { length: 20 }).default("pending"), // pending, confirmed, cancelled, completed
  created_at: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  business_id: uuid("business_id").references(() => businesses.id).notNull(),
  customer_name: varchar("customer_name", { length: 200 }),
  rating: integer("rating").notNull(), // 1-5
  comment: text("comment"),
  is_verified: boolean("is_verified").default(false),
  created_at: timestamp("created_at").defaultNow(),
});
