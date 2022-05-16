import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return this.productRepository.save(createProductDto);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  findAll(): Promise<Product[]> {
    try {
      return this.productRepository.find();
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.findOne(id);
      if (!product) {
        throw new NotFoundException('Note is not found');
      }
      return product;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const product = await this.productRepository.findOne(id);
      const updateProduct = Object.assign(product, updateProductDto);
      if (!product) {
        throw new NotFoundException('Note is not found');
      }
      return await this.productRepository.save(updateProduct);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const product = await this.productRepository.findOne(id);
      if (!product) {
        throw new NotFoundException('Note is not found');
      }
      await this.productRepository.delete(id);
      return `Record deleted successfully`;
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
