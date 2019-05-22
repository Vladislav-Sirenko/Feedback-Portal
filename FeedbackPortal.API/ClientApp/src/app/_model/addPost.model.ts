export interface AddPost {
  id: number;
  mark: number;
  text: string;
  date: string;
  departemntName: string;
}

export class AuthUser {
  id: number;
  first_name: string;
  password: string;
  admin: number;
  constructor(first_name: string, password: string, admin: number) {
    this.first_name = first_name;
    this.password = password;
    this.admin = admin;
  }
}
