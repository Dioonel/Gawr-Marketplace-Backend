import { IsNumber, IsPositive, IsOptional, IsMongoId, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
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

export class UpdateItemDTO extends PartialType(CreateItemDTO) {}

export class ItemDTO {
  product: Product;
  quantity: number;
  subtotal?: number;
}
