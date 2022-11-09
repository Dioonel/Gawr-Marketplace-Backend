import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  readonly product: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
