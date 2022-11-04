import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { CreateProductDTO } from './../../products/dtos/products.dtos';

export class rawPostingDTO {
  @IsNotEmpty()
  readonly product: CreateProductDTO;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
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
  readonly description: string;
}

export class UpdatePostingDTO extends PartialType(CreatePostingDTO) {}
