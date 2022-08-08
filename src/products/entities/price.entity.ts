import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CurrencyCodeEnum } from '../enums/currency-code.enum';
import { CurrencySymbolEnum } from '../enums/currency-symbol.enum';
import { CurrencyCodeType } from '../types/currency-code.type';
import { CurrencySymbolType } from '../types/currency-symbol.type';

@Entity('prices')
export class PriceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({
    type: 'decimal',
    precision: 7,
    scale: 2,
    default: 0.0,
    nullable: true,
  })
  current: string;

  @Column({
    type: 'enum',
    enum: [CurrencyCodeEnum.USD, CurrencyCodeEnum.EUR, CurrencyCodeEnum.UAH],
    nullable: false,
  })
  currency_code: CurrencyCodeType;

  @Column({
    type: 'enum',
    enum: [
      CurrencySymbolEnum.USD,
      CurrencySymbolEnum.EUR,
      CurrencySymbolEnum.UAH,
    ],
    nullable: false,
  })
  symbol: CurrencySymbolType;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;

  @OneToOne(() => ProductEntity, (product) => product.price)
  product: ProductEntity;
}
