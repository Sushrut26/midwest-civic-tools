import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
  SITE_URL: z.string().url().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));
  throw new Error(`Invalid environment configuration: ${JSON.stringify(issues)}`);
}

export const env = parsed.data;
export { envSchema };
