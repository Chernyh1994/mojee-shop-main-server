export class CreateUserDto {
  readonly firstName: string;
  readonly email: string;
  readonly password: string;
  readonly age: number;
  readonly role_id?: number;
}
