import type { UserRole, UserStatus } from "@/types/user";
import { z } from "zod";

const userStatusSchema = z.union([
  z.literal("active"),
  z.literal("inactive"),
  z.literal("invited"),
  z.literal("suspended"),
]) satisfies z.ZodType<UserStatus>;

const userRoleSchema = z.union([
  z.literal("superadmin"),
  z.literal("admin"),
  z.literal("cashier"),
  z.literal("manager"),
  z.literal("user"),
]) satisfies z.ZodType<UserRole>;

const userSchema = z.object({
  id: z.string(),
  // Campos originais
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  isAdmin: z.boolean(),
  image: z.string().nullable().optional(),

  // Novos campos (podem ser null)
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  username: z.string().nullable().optional(),
  phoneNumber: z.string().nullable().optional(),
  status: userStatusSchema,
  role: userRoleSchema,

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof userSchema>;
export { userRoleSchema, userStatusSchema };
export const userListSchema = z.array(userSchema);
