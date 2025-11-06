import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../config/environments/environment';
import { ProductModel } from '../models/product.model';
import { DataResponse } from '../models/dataResponse.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private readonly _httpClient = inject(HttpClient)

    getProducts() {
        return this._httpClient.get<DataResponse<ProductModel[]>>(`${enviroment.baseUrl}/product`);
    }
  }
