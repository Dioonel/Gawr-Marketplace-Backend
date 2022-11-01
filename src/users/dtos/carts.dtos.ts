import { IsOptional, IsNotEmpty, IsMongoId, IsArray } from 'class-validator';
//import { PartialType } from '@nestjs/mapped-types';

//import { ItemDTO } from 'src/products/dtos/items.dtos';

export class CreateCartDTO {
  @IsArray()
  @IsNotEmpty()
  readonly items: any;
}

//export class UpdateCartDTO extends PartialType(CreateCartDTO) {}
