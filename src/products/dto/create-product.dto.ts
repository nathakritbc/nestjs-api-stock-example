import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateProductDto {
  @ApiProperty({
    type: String,
    maxLength: 50,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly p_name: string;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly p_price: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly p_count: number;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly p_image: string;
}
