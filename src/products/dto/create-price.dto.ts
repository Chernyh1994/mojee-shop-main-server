import { IsDefined, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, Max, MaxLength, Min } from 'class-validator';
import { CurrencyCodeEnum } from '../enums/currency-code.enum';
import { CurrencyCodeType } from '../types/currency-code.type';
import { CurrencySymbolEnum } from '../enums/currency-symbol.enum';
import { CurrencySymbolType } from '../types/currency-symbol.type';

export class CreatePriceDto {
  @IsString()
  @MaxLength(50, {
    message: 'name is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(99999.99, {
    message: 'price is very large. Maximal large is $constraint1, but actual is $value',
  })
  readonly current: number;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(CurrencyCodeEnum)
  readonly currency_code: CurrencyCodeType;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(CurrencySymbolEnum)
  readonly symbol: CurrencySymbolType;
}
