import { IsString, IsNotEmpty, IsMongoId, IsOptional, IsPositive, Min, IsUrl, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class rawPostingDTO {

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsOptional()
  @IsUrl()
  readonly image: string;
}

export class CreatePostingDTO {
  @IsNotEmpty()
  @IsMongoId()
  readonly seller: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

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
