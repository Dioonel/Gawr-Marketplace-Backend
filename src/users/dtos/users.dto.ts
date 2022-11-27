import { IsString, IsNumber, IsPositive, IsUrl, IsOptional, IsNotEmpty, IsMongoId, Length, Min, IsEmail, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

import { Role, Gender, CountryCode } from './enums';

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
  @IsEnum(Role)
  readonly role: Role;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly age: number;

  @IsOptional()
  @IsUrl()
  readonly image: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly bio: string;

  @IsOptional()
  @IsString()
  @IsEnum(Gender)
  readonly gender: Gender;

  @IsOptional()
  @IsUrl()
  readonly social: string;

  @IsOptional()
  @IsString()
  @IsEnum(CountryCode)
  readonly country: CountryCode;

  @IsOptional()
  @IsMongoId()
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
