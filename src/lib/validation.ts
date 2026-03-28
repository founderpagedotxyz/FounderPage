import { z } from "zod";

// Lista de usernames reservados que no se pueden usar
export const RESERVED_USERNAMES = [
  "admin",
  "dashboard",
  "api",
  "settings",
  "login",
  "register",
  "auth",
  "profile",
  "user",
  "users",
  "signup",
  "signin",
  "signout",
  "logout",
  "account",
  "new",
  "edit",
  "delete",
  "create",
  "update",
  "about",
  "contact",
  "help",
  "support",
  "terms",
  "privacy",
  "policy",
  "legal",
  "blog",
  "news",
  "home",
  "index",
  "root",
  "www",
  "ftp",
  "mail",
  "pop",
  "smtp",
  "new-startup",
  "startups",
  "leaderboards",
  "pricing",
  "features",
  "examples",
];

export const usernameSchema = z
  .string()
  .trim()
  .min(3, { message: "Username must be at least 3 characters" })
  .max(30, { message: "Username must be less than 30 characters" })
  .regex(/^[a-z0-9_-]+$/, {
    message: "Username can only contain lowercase letters, numbers, hyphens and underscores",
  })
  .refine(
    (username) => !RESERVED_USERNAMES.includes(username.toLowerCase()),
    {
      message: "This username is reserved and cannot be used",
    }
  );

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .max(100, { message: "Name must be less than 100 characters" })
    .optional(),
  bio: z
    .string()
    .trim()
    .max(500, { message: "Bio must be less than 500 characters" })
    .optional(),
  location: z
    .string()
    .trim()
    .max(100, { message: "Location must be less than 100 characters" })
    .optional(),
  photo_url: z.string().url().optional().or(z.literal("")),
});

export const startupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Startup name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  description: z
    .string()
    .trim()
    .max(500, { message: "Description must be less than 500 characters" })
    .optional(),
  url: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal("")),
  category: z
    .string()
    .trim()
    .max(50, { message: "Category must be less than 50 characters" })
    .optional(),
  monthly_income: z.number().int().min(0).optional(),
  logo_url: z.string().url().optional().or(z.literal("")),
});
