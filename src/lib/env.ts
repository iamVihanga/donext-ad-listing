import { z, ZodError } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]),
  DATABASE_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
  NEXT_PUBLIC_API_URL: z.string()
});

export type Env = z.infer<typeof EnvSchema>;

let env: Env;

try {
  env = EnvSchema.parse(process.env);
} catch (err) {
  const error = err as ZodError;
  console.error("❌ Invalid environment variables");
  console.error(error.flatten());
  process.exit(0);
}

export { env };
