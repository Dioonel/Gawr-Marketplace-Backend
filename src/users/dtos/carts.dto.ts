import { IsNotEmpty, IsArray } from 'class-validator';

export class CreateCartDTO {
  @IsArray()
  @IsNotEmpty()
  readonly items: any;
}
