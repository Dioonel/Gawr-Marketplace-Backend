import { IsString, IsNumber, IsPositive, IsUrl, IsOptional, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDTO {

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly age: number;

  @IsOptional()
  @IsUrl()
  readonly image: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
