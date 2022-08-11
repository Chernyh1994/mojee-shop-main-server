import { IsEnum, IsNumber, IsPositive, IsString, Max, MaxLength, Min } from 'class-validator';
import { CurrencyCodeEnum } from '../enums/currency-code.enum';
import { CurrencyCodeType } from '../types/currency-code.type';
import { CurrencySymbolEnum } from '../enums/currency-symbol.enum';
import { CurrencySymbolType } from '../types/currency-symbol.type';

export class UpdatePriceDto {
  @IsString()
  @MaxLength(50, {
    message: 'name is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly name: string;

  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(99999.99, {
    message: 'price is very large. Maximal large is $constraint1, but actual is $value',
  })
  readonly current: number;

  @IsEnum(CurrencyCodeEnum)
  readonly currency_code: CurrencyCodeType;

  @IsEnum(CurrencySymbolEnum)
  readonly symbol: CurrencySymbolType;
}
