import { IsEnum, IsString, MaxLength } from 'class-validator';
import { SizeEnum } from '../enums/size.enum';
import { SizeType } from '../types/size.type';

export class UpdateDetailDto {
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

  @IsEnum(SizeEnum)
  readonly size: SizeType;

  @IsString()
  @MaxLength(50, {
    message: 'fabric_type is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly fabric_type: string;

  @IsString()
  @MaxLength(50, {
    message: 'product_country is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly product_country: string;

  @IsString()
  @MaxLength(50, {
    message: 'brand is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly brand: string;
}
