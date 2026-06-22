"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminConfigController = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("@repo/db");
const drizzle_orm_1 = require("drizzle-orm");
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Assume guard exists
// import { RolesGuard } from '../auth/roles.guard';
// import { Roles } from '../auth/roles.decorator';
let AdminConfigController = (() => {
    let _classDecorators = [(0, common_1.Controller)('admin/config')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getConfig_decorators;
    let _updateConfig_decorators;
    var AdminConfigController = _classThis = class {
        // Generic GET to fetch any config
        async getConfig(key) {
            const [config] = await db_1.db
                .select()
                .from(db_1.systemConfigs)
                .where((0, drizzle_orm_1.eq)(db_1.systemConfigs.key, key));
            if (!config)
                return { key, value: null };
            // Attempt to parse JSON if possible, otherwise return raw string
            try {
                return { key, value: JSON.parse(config.value) };
            }
            catch {
                return { key, value: config.value };
            }
        }
        // Generic POST to update any config
        async updateConfig(key, body) {
            const valueString = typeof body.value === 'object'
                ? JSON.stringify(body.value)
                : String(body.value);
            await db_1.db
                .insert(db_1.systemConfigs)
                .values({
                key,
                value: valueString,
                updatedAt: new Date()
            })
                .onConflictDoUpdate({
                target: db_1.systemConfigs.key,
                set: { value: valueString, updatedAt: new Date() },
            });
            return { success: true };
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    __setFunctionName(_classThis, "AdminConfigController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getConfig_decorators = [(0, common_1.Get)(':key')];
        _updateConfig_decorators = [(0, common_1.Post)(':key')];
        __esDecorate(_classThis, null, _getConfig_decorators, { kind: "method", name: "getConfig", static: false, private: false, access: { has: obj => "getConfig" in obj, get: obj => obj.getConfig }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateConfig_decorators, { kind: "method", name: "updateConfig", static: false, private: false, access: { has: obj => "updateConfig" in obj, get: obj => obj.updateConfig }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminConfigController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminConfigController = _classThis;
})();
exports.AdminConfigController = AdminConfigController;
