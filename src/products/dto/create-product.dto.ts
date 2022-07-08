export class CreateProductDto {
  readonly name: string;
  readonly category: string;
  readonly price: number;
  readonly currency: string;
  readonly discount: boolean;
}
