"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemConfigs = exports.reviews = exports.rentalItems = exports.rentalOrders = exports.events = exports.equipment = exports.users = exports.rentalStatusEnum = exports.eventStatusEnum = exports.userRoleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.userRoleEnum = (0, pg_core_1.pgEnum)("user_role", ["admin", "client", "dj"]);
exports.eventStatusEnum = (0, pg_core_1.pgEnum)("event_status", ["pending", "confirmed", "completed", "cancelled"]);
exports.rentalStatusEnum = (0, pg_core_1.pgEnum)("rental_status", ["pending", "out_for_delivery", "returned", "damaged"]);
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull().unique(),
    phone: (0, pg_core_1.varchar)("phone", { length: 20 }),
    role: (0, exports.userRoleEnum)("role").default("client").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.equipment = (0, pg_core_1.pgTable)("equipment", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    category: (0, pg_core_1.varchar)("category", { length: 100 }).notNull(),
    description: (0, pg_core_1.text)("description"),
    dailyRate: (0, pg_core_1.decimal)("daily_rate", { precision: 10, scale: 2 }).notNull(),
    totalStock: (0, pg_core_1.integer)("total_stock").default(1).notNull(),
    availableStock: (0, pg_core_1.integer)("available_stock").default(1).notNull(),
    imageUrl: (0, pg_core_1.text)("image_url"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
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
exports.rentalOrders = (0, pg_core_1.pgTable)("rental_orders", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    clientId: (0, pg_core_1.uuid)("client_id").references(() => exports.users.id).notNull(),
    eventId: (0, pg_core_1.uuid)("event_id").references(() => exports.events.id),
    status: (0, exports.rentalStatusEnum)("status").default("pending").notNull(),
    startDate: (0, pg_core_1.timestamp)("start_date").notNull(),
    endDate: (0, pg_core_1.timestamp)("end_date").notNull(),
    totalPrice: (0, pg_core_1.decimal)("total_price", { precision: 12, scale: 2 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.rentalItems = (0, pg_core_1.pgTable)("rental_items", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    orderId: (0, pg_core_1.uuid)("order_id").references(() => exports.rentalOrders.id).notNull(),
    equipmentId: (0, pg_core_1.integer)("equipment_id").references(() => exports.equipment.id).notNull(),
    quantity: (0, pg_core_1.integer)("quantity").default(1).notNull(),
});
exports.reviews = (0, pg_core_1.pgTable)("reviews", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    authorId: (0, pg_core_1.uuid)("author_id").references(() => exports.users.id).notNull(),
    targetEventId: (0, pg_core_1.uuid)("event_id").references(() => exports.events.id),
    targetEquipmentId: (0, pg_core_1.integer)("equipment_id").references(() => exports.equipment.id),
    rating: (0, pg_core_1.integer)("rating").notNull(),
    comment: (0, pg_core_1.text)("comment"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.systemConfigs = (0, pg_core_1.pgTable)("system_configs", {
    key: (0, pg_core_1.varchar)("key", { length: 100 }).primaryKey(),
    value: (0, pg_core_1.text)("value").notNull(),
    description: (0, pg_core_1.text)("description"),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
});
//# sourceMappingURL=schema.js.map