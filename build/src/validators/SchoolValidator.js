"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
class SchoolValidator {
    static schoolSchema() {
        return zod_1.z.object({
            name: zod_1.z.string(),
            location: zod_1.z.string(),
            studentCount: zod_1.z.number(),
            schoolImage: zod_1.z.string().url(),
            meta: zod_1.z.string().optional(),
        });
    }
}
exports.default = SchoolValidator;
