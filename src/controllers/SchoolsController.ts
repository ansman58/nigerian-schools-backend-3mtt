import { Request, Response } from "express";
import { faker } from "@faker-js/faker";

import School from "../model/School";
import SchoolValidator from "../validators/SchoolValidator";

export default class SchoolsController {
  async index(request: Request, response: Response) {
    try {
      const schools = await School.find();

      return response.status(200).json({ success: true, data: schools });
    } catch (error) {
      console.log("Error fetching schools: ", error);
      response
        .status(500)
        .json({ succcess: false, error: "Error fetching schools" });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const schema = SchoolValidator.schoolSchema();
      const { location, name, schoolImage, studentCount } = schema.parse(
        request.body
      );

      const school = await School.create({
        location,
        name,
        schoolImage,
        studentCount,
      });

      return response.status(201).json({ success: true, data: school });
    } catch (error) {
      console.log("Error creating school: ", error);
      response
        .status(500)
        .json({ success: false, error: "Error creating school" });
    }
  }

  async generateFakeSchhols(request: Request, response: Response) {
    try {
      const generateRandomSchool = () => {
        return {
          name: faker.company.name() + " School",
          location: faker.address.city(),
          studentCount: faker.datatype.number({ min: 100, max: 1000 }),
          schoolImage: faker.image.imageUrl(),
        };
      };

      const schools = Array.from({ length: 200 }, generateRandomSchool);

      await School.insertMany(schools);

      return response.status(201).json({ success: true, data: schools });
    } catch (error) {
      console.log("Error creating schools: ", error);
      response
        .status(500)
        .json({ success: false, error: "Error creating schools" });
    }
  }
}
