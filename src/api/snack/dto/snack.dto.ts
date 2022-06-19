import { IsNotEmpty, IsString } from 'class-validator';

export class SnackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}
