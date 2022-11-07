import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class rawCommentDTO {
  @IsNotEmpty()
  @IsString()
  readonly body: string;
}

export class CreateCommentDTO {
  @IsNotEmpty()
  @IsMongoId()
  readonly user: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly posting: string;

  @IsNotEmpty()
  @IsString()
  readonly body: string;
}
