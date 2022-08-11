import { IsInt, IsString, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateDetailDto } from './update-detail.dto';
import { UpdatePriceDto } from './update-price.dto';

export class UpdateProductDto {
  @IsString()
  @MaxLength(50, {
    message: 'name is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly name: string;

  @IsInt()
  @Min(0)
  readonly category_id: number;

  @ValidateNested()
  @Type(() => UpdateDetailDto)
  readonly detail: UpdateDetailDto;

  @ValidateNested()
  @Type(() => UpdatePriceDto)
  readonly price: UpdatePriceDto;
}
