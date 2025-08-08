import { z } from "zod";

import { AdSchema, AdTypeSchema, AdStatusSchema } from "@/types/schema-types";

export const IdParamsSchema = z.object({ id: z.string() });

export const querySchema = z.object({
  page: z.string().optional().default("1"),
  limit: z.string().optional().default("10"),
  search: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  location: z.string().optional(),
});

export type QueryParams = z.infer<typeof querySchema>;

// Make sure the Ad fields match what's generated from Prisma
const formattedAdSchema = AdSchema.extend({
  price: z.number().nullable(),
  location: z.string().nullable(),
  metadata: z.record(z.any()).nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  boostExpiry: z.string().nullable(),
  featureExpiry: z.string().nullable(),
  expiryDate: z.string().nullable(),
});

export const withPaginationSchema = z.object({
  ads: z.array(formattedAdSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

// CRUD Schemas
export const AdTypes = AdTypeSchema.enum;
export const AdStatuses = AdStatusSchema.enum;

export const selectAdSchema = formattedAdSchema;

export type SelectAdSchema = z.infer<typeof selectAdSchema>;

export const createAdSchema = z
  .object({
    // Basic required fields
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    type: z.enum(
      [
        "CAR",
        "VAN",
        "MOTORCYCLE",
        "BICYCLE",
        "THREE_WHEEL",
        "BUS",
        "LORRY",
        "HEAVY_DUTY",
        "TRACTOR",
        "AUTO_SERVICE",
        "RENTAL",
        "AUTO_PARTS",
        "MAINTENANCE",
        "BOAT",
      ],
      { required_error: "Please select an ad type" }
    ),

    // Optional basic fields
    price: z.number().positive().optional(),
    published: z.boolean().default(false),
    isDraft: z.boolean().default(true),
    boosted: z.boolean().default(false),
    featured: z.boolean().default(false),

    // SEO fields
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    categoryId: z.string().optional(),
    tags: z.array(z.string()).optional(),

    // Common vehicle fields (used by multiple types)
    condition: z.string().optional(),
    brand: z.string().optional(),
    model: z.string().optional(),
    trimEdition: z.string().optional(),

    // Year fields (different names for different types)
    manufacturedYear: z.string().optional(), // Used by: Car, Motor Bike
    modelYear: z.string().optional(), // Used by: Van, Three Wheeler, Bus, Lorry, Heavy Duty, Tractor

    // Performance fields
    mileage: z.number().optional(), // Used by: Car, Van, Motor Bike, Three Wheeler, Bus, Lorry
    engineCapacity: z.number().optional(), // Used by: Car, Van, Motor Bike, Bus, Lorry

    // Car & Van specific fields
    fuelType: z
      .enum(["PETROL", "DIESEL", "HYBRID", "ELECTRIC", "GAS"])
      .optional(),
    transmission: z.enum(["MANUAL", "AUTOMATIC", "CVT"]).optional(),
    bodyType: z.enum(["SALOON", "HATCHBACK", "STATION_WAGON"]).optional(),

    // Motor Bike specific fields
    bikeType: z
      .enum(["SCOOTER", "E_BIKE", "MOTORBIKES", "QUADRICYCLES"])
      .optional(),

    // Heavy Duty specific fields
    vehicleType: z
      .enum([
        "BED_TRAILER",
        "BOWSER",
        "BULLDOZER",
        "CRANE",
        "DUMP_TRUCK",
        "EXCAVATOR",
        "LOADER",
        "OTHER",
      ])
      .optional(),

    // Service & Parts specific fields
    serviceType: z.string().optional(), // Used by: Auto Service, Rental
    partType: z.string().optional(), // Used by: Auto Parts
    maintenanceType: z.string().optional(), // Used by: Maintenance

    // Contact info
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    whatsappNumber: z.string().optional(),
    termsAndConditions: z.boolean().optional(),

    // Location info
    location: z.string().optional(),
    address: z.string().optional(),
    province: z.string().optional(),
    district: z.string().optional(),
    city: z.string().optional(),
    specialNote: z.string().optional(),

    // Media
    mediaIds: z.array(z.string()).optional(),
    metadata: z.record(z.any()).optional(),
  })
  .superRefine((data, ctx) => {
    // Type-specific validation rules
    switch (data.type) {
      case "CAR":
        if (!data.condition) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Condition is required for cars",
            path: ["condition"],
          });
        }
        if (!data.brand) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Brand is required for cars",
            path: ["brand"],
          });
        }
        if (!data.model) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Model is required for cars",
            path: ["model"],
          });
        }
        if (!data.manufacturedYear) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Year of Manufacture is required for cars",
            path: ["manufacturedYear"],
          });
        }
        if (!data.fuelType) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Fuel Type is required for cars",
            path: ["fuelType"],
          });
        }
        if (!data.transmission) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Transmission is required for cars",
            path: ["transmission"],
          });
        }
        break;

      case "VAN":
        if (!data.condition) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Condition is required for vans",
            path: ["condition"],
          });
        }
        if (!data.brand) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Brand is required for vans",
            path: ["brand"],
          });
        }
        if (!data.model) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Model is required for vans",
            path: ["model"],
          });
        }
        if (!data.modelYear) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Model Year is required for vans",
            path: ["modelYear"],
          });
        }
        break;

      case "MOTORCYCLE":
        if (!data.condition) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Condition is required for motorcycles",
            path: ["condition"],
          });
        }
        if (!data.bikeType) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Bike Type is required for motorcycles",
            path: ["bikeType"],
          });
        }
        if (!data.brand) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Brand is required for motorcycles",
            path: ["brand"],
          });
        }
        if (!data.model) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Model is required for motorcycles",
            path: ["model"],
          });
        }
        if (!data.manufacturedYear) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Year of Manufacture is required for motorcycles",
            path: ["manufacturedYear"],
          });
        }
        if (!data.engineCapacity) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Engine Capacity is required for motorcycles",
            path: ["engineCapacity"],
          });
        }
        break;

      case "BICYCLE":
        if (!data.brand) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Brand is required for bicycles",
            path: ["brand"],
          });
        }
        if (!data.condition) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Condition is required for bicycles",
            path: ["condition"],
          });
        }
        break;

      case "AUTO_SERVICE":
      case "RENTAL":
        if (!data.serviceType) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Service Type is required",
            path: ["serviceType"],
          });
        }
        break;

      case "AUTO_PARTS":
        if (!data.condition) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Condition is required for auto parts",
            path: ["condition"],
          });
        }
        if (!data.partType) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Part or Accessory Type is required",
            path: ["partType"],
          });
        }
        break;

      case "MAINTENANCE":
        if (!data.maintenanceType) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Maintenance and Repair Type is required",
            path: ["maintenanceType"],
          });
        }
        break;

      case "HEAVY_DUTY":
        if (!data.vehicleType) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Vehicle Type is required for heavy duty vehicles",
            path: ["vehicleType"],
          });
        }
        break;

      // Add validation for other types as needed...
    }
  });

export type CreateAdSchema = z.infer<typeof createAdSchema>;

export const updateAdSchema = createAdSchema.innerType().partial().extend({
  id: z.string().optional(),
});

export type UpdateAdSchema = z.infer<typeof updateAdSchema>;

export const deleteAdSchema = IdParamsSchema;
export type DeleteAdSchema = z.infer<typeof deleteAdSchema>;
