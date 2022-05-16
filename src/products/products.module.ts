import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [ProductsController],
  imports: [
    NestjsFormDataModule,
    TypeOrmModule.forFeature([Product]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './files',
      }),
    }),
  ],
  providers: [ProductsService],
  // exports: [ProductsService],
})
export class ProductsModule {}
