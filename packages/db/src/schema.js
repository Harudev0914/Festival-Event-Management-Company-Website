"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogs = exports.mainVisualItems = exports.systemConfigs = exports.reviews = exports.rentalItems = exports.rentalOrders = exports.events = exports.equipment = exports.users = exports.rentalStatusEnum = exports.eventStatusEnum = exports.userRoleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// Enums for Status Management
exports.userRoleEnum = (0, pg_core_1.pgEnum)("user_role", ["admin", "client", "dj"]);
exports.eventStatusEnum = (0, pg_core_1.pgEnum)("event_status", ["pending", "confirmed", "completed", "cancelled"]);
exports.rentalStatusEnum = (0, pg_core_1.pgEnum)("rental_status", ["pending", "out_for_delivery", "returned", "damaged"]);
// 1. Users Table (Admin, Client, DJ)
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull().unique(),
    phone: (0, pg_core_1.varchar)("phone", { length: 20 }),
    role: (0, exports.userRoleEnum)("role").default("client").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
// 2. Equipment Table (For Rental Service)
exports.equipment = (0, pg_core_1.pgTable)("equipment", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    category: (0, pg_core_1.varchar)("category", { length: 100 }).notNull(), // e.g., 'Mixer', 'Speaker', 'Lighting'
    description: (0, pg_core_1.text)("description"),
    dailyRate: (0, pg_core_1.decimal)("daily_rate", { precision: 10, scale: 2 }).notNull(),
    totalStock: (0, pg_core_1.integer)("total_stock").default(1).notNull(),
    availableStock: (0, pg_core_1.integer)("available_stock").default(1).notNull(),
    imageUrl: (0, pg_core_1.text)("image_url"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
// 3. Events Table (DJ Booking Service)
exports.events = (0, pg_core_1.pgTable)("events", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    clientId: (0, pg_core_1.uuid)("client_id").references(() => exports.users.id).notNull(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description"),
    location: (0, pg_core_1.text)("location").notNull(),
    eventDate: (0, pg_core_1.timestamp)("event_date").notNull(),
    status: (0, exports.eventStatusEnum)("status").default("pending").notNull(),
    budget: (0, pg_core_1.decimal)("budget", { precision: 12, scale: 2 }),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
// 4. Rental Orders Table
exports.rentalOrders = (0, pg_core_1.pgTable)("rental_orders", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    clientId: (0, pg_core_1.uuid)("client_id").references(() => exports.users.id).notNull(),
    eventId: (0, pg_core_1.uuid)("event_id").references(() => exports.events.id), // Optional: link rental to an event
    status: (0, exports.rentalStatusEnum)("status").default("pending").notNull(),
    startDate: (0, pg_core_1.timestamp)("start_date").notNull(),
    endDate: (0, pg_core_1.timestamp)("end_date").notNull(),
    totalPrice: (0, pg_core_1.decimal)("total_price", { precision: 12, scale: 2 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
// 5. Rental Items (Many-to-Many relationship between Order and Equipment)
exports.rentalItems = (0, pg_core_1.pgTable)("rental_items", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    orderId: (0, pg_core_1.uuid)("order_id").references(() => exports.rentalOrders.id).notNull(),
    equipmentId: (0, pg_core_1.integer)("equipment_id").references(() => exports.equipment.id).notNull(),
    quantity: (0, pg_core_1.integer)("quantity").default(1).notNull(),
});
// 6. Reviews Table
exports.reviews = (0, pg_core_1.pgTable)("reviews", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    authorId: (0, pg_core_1.uuid)("author_id").references(() => exports.users.id).notNull(),
    targetEventId: (0, pg_core_1.uuid)("event_id").references(() => exports.events.id),
    targetEquipmentId: (0, pg_core_1.integer)("equipment_id").references(() => exports.equipment.id),
    rating: (0, pg_core_1.integer)("rating").notNull(), // 1-5
    comment: (0, pg_core_1.text)("comment"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
// 7. System Configs Table (For Feature Flags & Menu Management)
exports.systemConfigs = (0, pg_core_1.pgTable)("system_configs", {
    key: (0, pg_core_1.varchar)("key", { length: 100 }).primaryKey(), // e.g., 'menu_rental_visible', 'main_visual_hero_image'
    value: (0, pg_core_1.text)("value").notNull(), // 'true', 'false', or JSON string for complex config
    description: (0, pg_core_1.text)("description"),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
});
// 9. Main Visual Items Table
exports.mainVisualItems = (0, pg_core_1.pgTable)("main_visual_items", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    number: (0, pg_core_1.integer)("number").notNull(), // 순서/번호
    title: (0, pg_core_1.varchar)("title", { length: 255 }).notNull(),
    imageUrl: (0, pg_core_1.varchar)("image_url", { length: 500 }).notNull(),
    subtitle: (0, pg_core_1.text)("subtitle"),
    isActive: (0, pg_core_1.integer)("is_active").default(1), // 1: 활성, 0: 비활성
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
});
// 10. Audit Logs Table (For tracking changes)
exports.auditLogs = (0, pg_core_1.pgTable)("audit_logs", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    action: (0, pg_core_1.varchar)("action", { length: 100 }).notNull(), // 예: 'CREATE_VISUAL', 'UPDATE_VISUAL'
    targetId: (0, pg_core_1.varchar)("target_id", { length: 100 }),
    performedBy: (0, pg_core_1.varchar)("performed_by", { length: 100 }),
    details: (0, pg_core_1.text)("details"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
