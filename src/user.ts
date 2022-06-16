export type UserRequestDto = User;
export type UserResponseDto = User;

export class User {
  firstName: string;
  lastName: string;
  email: string;

  constructor(p: Partial<User> = {}) {
    this.firstName = p.firstName;
    this.lastName = p.lastName;
    this.email = p.email;
  }
}