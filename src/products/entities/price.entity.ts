import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

enum CurrencyCodeValues {
  USD = 'USD',
  EUR = 'EUR',
  UAH = 'UAH',
}

type CurrencyCodeType = keyof typeof CurrencyCodeValues;

enum CurrencySymbolValues {
  USD = '$',
  EUR = '€',
  UAH = '₴',
}

type CurrencySymbolType = keyof typeof CurrencySymbolValues;

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
    enum: [
      CurrencyCodeValues.USD,
      CurrencyCodeValues.EUR,
      CurrencyCodeValues.UAH,
    ],
    nullable: false,
  })
  currency_code: CurrencyCodeType;

  @Column({
    type: 'enum',
    enum: [
      CurrencySymbolValues.USD,
      CurrencySymbolValues.EUR,
      CurrencySymbolValues.UAH,
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
