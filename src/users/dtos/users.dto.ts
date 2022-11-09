import { IsString, IsNumber, IsPositive, IsUrl, IsOptional, IsNotEmpty, IsMongoId, Length, Min } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateUserDTO {

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly role: string;

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

  // @IsOptional()
  // @IsArray()
  // readonly postings: string[];                                                       don't want users to update their postings from here
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}

export class FilterUserDTO {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsString()
  username: string;
}
