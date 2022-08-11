import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateDetailDto } from './create-detail.dto';
import { CreatePriceDto } from './create-price.dto';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'name is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  readonly category_id: number;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateDetailDto)
  readonly detail: CreateDetailDto;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreatePriceDto)
  readonly price: CreatePriceDto;
}
