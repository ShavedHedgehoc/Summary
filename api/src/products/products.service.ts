import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';

@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product) private productRepository: typeof Product) { }

    async findOrCreateProduct(name: string) {
        const [product, _] = await this.productRepository.findOrCreate({ where: { name: name } });
        return product;
    }

}
