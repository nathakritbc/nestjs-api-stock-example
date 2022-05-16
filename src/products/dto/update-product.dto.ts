import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    type: String,
    maxLength: 50,
    required: true,
  })
  @IsString()
  readonly p_name: string;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  readonly p_price: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  readonly p_count: number;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  readonly p_image: string;
}
