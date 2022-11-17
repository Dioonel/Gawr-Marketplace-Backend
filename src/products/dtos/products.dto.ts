import { IsString, IsNumber, IsPositive, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  readonly product: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsOptional()
  @IsUrl()
  readonly image: string;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
