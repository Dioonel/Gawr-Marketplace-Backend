import { IsString, IsNumber, IsPositive, IsUrl, IsOptional, IsNotEmpty, IsMongoId, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDTO {

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  readonly password: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly age: number;

  @IsOptional()
  @IsUrl()
  readonly image: string;

  @IsMongoId()
  @IsOptional()
  readonly cart: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
