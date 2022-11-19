import { IsNumber, IsPositive, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateItemDTO {
  @IsNotEmpty()
  @IsMongoId()
  readonly posting: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly quantity: number;
}
