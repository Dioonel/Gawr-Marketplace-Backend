import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductDTO, UpdateProductDTO } from './../dtos/products.dtos';
import { Product } from './../entities/product.entity';

@Injectable()
export class ProductsStoreService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async getAll() {
    return await this.productModel.find().select('-__v');
  }

  async getOne(id: string) {
    const product = await this.productModel.findById(id).select('-__v');
    if (!product) {
      throw new NotFoundException("Product not found.");
    }
    return product;
  }

  async create(data: CreateProductDTO){
    const newProduct = new this.productModel(data);
    return await newProduct.save();
  }

  async update(id: string, changes: UpdateProductDTO){
    const product = await this.productModel.findByIdAndUpdate(id, {$set: changes}, {new: true}).select('-__v');
    if (!product) {
      throw new NotFoundException("Product not found.");
    }
    return product;
  }

  async delete(id: string){
    const product = await this.productModel.findByIdAndDelete(id);
    if(!product) {
      throw new NotFoundException("Product not found.");
    }
    return true;
  }
}
