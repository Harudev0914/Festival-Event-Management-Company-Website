import { pgTable, serial, text, timestamp, varchar, integer, decimal, pgEnum, uuid, boolean } from "drizzle-orm/pg-core";

// Enums for Status Management
export const userRoleEnum = pgEnum("user_role", ["admin", "client", "dj"]);
export const eventStatusEnum = pgEnum("event_status", ["pending", "confirmed", "completed", "cancelled"]);
export const rentalStatusEnum = pgEnum("rental_status", ["pending", "out_for_delivery", "returned", "damaged"]);

// 1. Users Table (Admin, Client, DJ)
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  role: userRoleEnum("role").default("client").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 2. Equipment Table (For Rental Service)
export const equipment = pgTable("equipment", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: varchar("category", { length: 100 }).notNull(), // e.g., 'Mixer', 'Speaker', 'Lighting'
  description: text("description"),
  dailyRate: decimal("daily_rate", { precision: 10, scale: 2 }).notNull(),
  totalStock: integer("total_stock").default(1).notNull(),
  availableStock: integer("available_stock").default(1).notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 3. Events Table (DJ Booking Service)
export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  location: text("location").notNull(),
  eventDate: timestamp("event_date").notNull(),
  status: eventStatusEnum("status").default("pending").notNull(),
  budget: decimal("budget", { precision: 12, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 4. Rental Orders Table
export const rentalOrders = pgTable("rental_orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id").references(() => users.id).notNull(),
  eventId: uuid("event_id").references(() => events.id), // Optional: link rental to an event
  status: rentalStatusEnum("status").default("pending").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  totalPrice: decimal("total_price", { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 5. Rental Items (Many-to-Many relationship between Order and Equipment)
export const rentalItems = pgTable("rental_items", {
  id: serial("id").primaryKey(),
  orderId: uuid("order_id").references(() => rentalOrders.id).notNull(),
  equipmentId: integer("equipment_id").references(() => equipment.id).notNull(),
  quantity: integer("quantity").default(1).notNull(),
});

// 6. Reviews Table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  authorId: uuid("author_id").references(() => users.id).notNull(),
  targetEventId: uuid("event_id").references(() => events.id),
  targetEquipmentId: integer("equipment_id").references(() => equipment.id),
  rating: integer("rating").notNull(), // 1-5
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 7. System Configs Table (For Feature Flags & Menu Management)
export const systemConfigs = pgTable("system_configs", {
  key: varchar("key", { length: 100 }).primaryKey(), // e.g., 'menu_rental_visible', 'main_visual_hero_image'
  value: text("value").notNull(), // 'true', 'false', or JSON string for complex config
  description: text("description"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 9. Main Visual Items Table
export const mainVisualItems = pgTable("main_visual_items", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull(), // 순서/번호
  title: varchar("title", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  subtitle: text("subtitle"),
  isActive: integer("is_active").default(1), // 1: 활성, 0: 비활성
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 10. Audit Logs Table (For tracking changes)
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  action: varchar("action", { length: 100 }).notNull(), // 예: 'CREATE_VISUAL', 'UPDATE_VISUAL'
  targetId: varchar("target_id", { length: 100 }),
  performedBy: varchar("performed_by", { length: 100 }),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 11. Announcements Table
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  isActive: boolean("is_active").default(true),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 12. File Assets Table
export const fileAssets = pgTable("file_assets", {
  id: uuid("id").defaultRandom().primaryKey(),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileUrl: text("file_url").notNull(),
  fileType: varchar("file_type", { length: 100 }).notNull(),
  size: integer("size").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
