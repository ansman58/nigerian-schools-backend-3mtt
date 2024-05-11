"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const School_1 = __importDefault(require("../model/School"));
const SchoolValidator_1 = __importDefault(require("../validators/SchoolValidator"));
class SchoolsController {
    async index(request, response) {
        try {
            const schools = await School_1.default.find();
            return response.status(200).json({ success: true, data: schools });
        }
        catch (error) {
            console.log("Error fetching schools: ", error);
            response
                .status(500)
                .json({ succcess: false, error: "Error fetching schools" });
        }
    }
    async create(request, response) {
        try {
            const schema = SchoolValidator_1.default.schoolSchema();
            const { location, name, schoolImage, studentCount } = schema.parse(request.body);
            const school = await School_1.default.create({
                location,
                name,
                schoolImage,
                studentCount,
            });
            return response.status(201).json({ success: true, data: school });
        }
        catch (error) {
            console.log("Error creating school: ", error);
            response
                .status(500)
                .json({ success: false, error: "Error creating school" });
        }
    }
    async generateFakeSchhols(request, response) {
        try {
            const generateRandomSchool = () => {
                return {
                    name: faker_1.faker.company.name() + " School",
                    location: faker_1.faker.address.city(),
                    studentCount: faker_1.faker.datatype.number({ min: 100, max: 1000 }),
                    schoolImage: faker_1.faker.image.imageUrl(),
                };
            };
            const schools = Array.from({ length: 200 }, generateRandomSchool);
            await School_1.default.insertMany(schools);
            return response.status(201).json({ success: true, data: schools });
        }
        catch (error) {
            console.log("Error creating schools: ", error);
            response
                .status(500)
                .json({ success: false, error: "Error creating schools" });
        }
    }
}
exports.default = SchoolsController;
