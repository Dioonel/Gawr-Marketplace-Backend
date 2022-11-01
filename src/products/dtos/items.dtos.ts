import { IsNumber, IsPositive, IsOptional, IsMongoId, IsNotEmpty } from 'class-validator';
import { Product } from '../entities/product.entity';

export class CreateItemDTO {
  @IsNotEmpty()
  @IsMongoId()
  readonly product: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly quantity: number;
}
