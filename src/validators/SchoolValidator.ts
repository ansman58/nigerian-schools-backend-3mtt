import { z } from "zod";

export default class SchoolValidator {
  static schoolSchema() {
    return z.object({
      name: z.string(),
      location: z.string(),
      studentCount: z.number(),
      schoolImage: z.string().url(),
      meta: z.string().optional(),
    });
  }
}
