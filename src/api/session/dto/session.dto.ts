import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class AddOrderDto {
  @IsInt()
  @IsNotEmpty()
  whiteBuns: number;

  @IsInt()
  @IsNotEmpty()
  brownBuns: number;

  @IsNotEmpty()
  @IsArray()
  snacks: [{ id: number }];
}
