import { Role } from "@models/role.enum";

export class User {
  _id?: number;
  email?: string;
  password?: string;
  role: Role;
  username?: string;
  token?: string;
}
