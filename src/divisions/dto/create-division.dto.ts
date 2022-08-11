import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDivisionDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'name is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(250, {
    message: 'description is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly description: string;
}
