import { IsDefined, IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { SizeType } from '../types/size.type';
import { SizeEnum } from '../enums/size.enum';

export class CreateDetailDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'full_name is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly full_name: string;

  @IsString()
  @MaxLength(300, {
    message: 'description is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly description: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(SizeEnum)
  readonly size: SizeType;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'fabric_type is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly fabric_type: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'product_country is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly product_country: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'brand is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly brand: string;
}
