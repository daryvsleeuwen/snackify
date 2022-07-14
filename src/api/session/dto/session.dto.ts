import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

type SnackObject = {
  id: number;
  amount: number;
};
export class AddOrderDto {
  @IsInt()
  @IsNotEmpty()
  whiteBuns: number;

  @IsInt()
  @IsNotEmpty()
  brownBuns: number;

  @IsNotEmpty()
  @IsArray()
  snacks: SnackObject[];
}
