import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message:
      'name is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message:
      'category is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly category: string;

  @IsDefined()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Max(99999.99, {
    message:
      'price is very large. Maximal large is $constraint1, but actual is $value',
  })
  readonly price: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly currency: string;

  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  readonly discount: boolean;
}
