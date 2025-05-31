import { z, ZodError } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),
  DATABASE_URL: z.string().optional(),
  BETTER_AUTH_SECRET: z.string().optional(),
  BETTER_AUTH_URL: z.string().optional(),
  NEXT_PUBLIC_API_URL: z.string().optional(),

  NEXT_PUBLIC_AWS_REGION: z.string().optional(),
  NEXT_PUBLIC_AWS_ACCESS_KEY_ID: z.string().optional(),
  NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY: z.string().optional(),
  NEXT_PUBLIC_AWS_S3_BUCKET: z.string().optional()
});

export type Env = z.infer<typeof EnvSchema>;

let env: Env = EnvSchema.parse(process.env);

try {
  env = EnvSchema.parse(process.env);
} catch (err) {
  const error = err as ZodError;
  console.error("❌ Invalid environment variables");
  console.error(error.flatten());
  process.exit(0);
}

export { env };
