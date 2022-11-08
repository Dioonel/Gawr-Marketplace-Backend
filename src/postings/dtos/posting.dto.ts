import { IsString, IsNotEmpty, IsMongoId, IsOptional, IsPositive, Min, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { CreateProductDTO } from './../../products/dtos/products.dtos';

export class rawPostingDTO {
  @IsNotEmpty()
  readonly product: CreateProductDTO;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsUrl()
  readonly image: string;
}

export class CreatePostingDTO {
  @IsNotEmpty()
  @IsMongoId()
  readonly seller: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly product: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsUrl()
  readonly image: string;
}

export class UpdatePostingDTO extends PartialType(CreatePostingDTO) {}

export class FilterPostingDTO {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @IsOptional()
  @IsPositive()
  maxPrice: number;

  @IsOptional()
  @IsString()
  title: string;
}
