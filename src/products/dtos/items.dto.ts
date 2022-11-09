import { IsNumber, IsPositive, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateItemDTO {
  @IsNotEmpty()
  @IsMongoId()
  readonly product: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly quantity: number;
}
