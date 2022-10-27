import { IsString, IsNumber, IsPositive, IsUrl, IsOptional, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

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
