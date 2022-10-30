import { IsString, IsNumber, IsPositive, IsUrl, IsOptional, IsNotEmpty, IsMongoId, IsArray } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCartDTO {
  @IsOptional()
  @IsMongoId()
  readonly user: string;

  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}

//export class UpdateCartDTO extends PartialType(CreateCartDTO) {}
