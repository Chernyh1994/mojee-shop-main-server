import { IsDate, IsInt, IsString, MaxLength, Min } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @MaxLength(50, {
    message: 'first_name is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly first_name: string;

  @IsString()
  @MaxLength(50, {
    message: 'last_name is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly last_name: string;

  @IsString()
  @MaxLength(14, {
    message: 'phone_number is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly phone_number: string;

  @IsDate()
  readonly date_of_birth: Date;

  @IsString()
  @MaxLength(50, {
    message: 'country is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly country: string;

  @IsString()
  @MaxLength(75, {
    message: 'region is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly region: string;

  @IsString()
  @MaxLength(50, {
    message: 'city is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly city: string;

  @IsString()
  @MaxLength(75, {
    message: 'street is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly street: string;

  @IsInt()
  @Min(0)
  readonly zip_code: number;
}
