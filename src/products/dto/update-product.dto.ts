import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message:
      'name is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message:
      'category is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly category: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Max(99999.99, {
    message:
      'price is very large. Maximal large is $constraint1, but actual is $value',
  })
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  readonly currency: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly discount: boolean;
}
