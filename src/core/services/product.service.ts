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

    getProductbyId(id: number) {
        return this._httpClient.get<DataResponse<ProductModel>>(`${enviroment.baseUrl}/product/get-by-id/${id}`);
    }

    createProduct(body: any) {
        return this._httpClient.post<DataResponse<number>>(`${enviroment.baseUrl}/product`, body);
    }

    editProduct(body: any) {
        return this._httpClient.put<DataResponse<number>>(`${enviroment.baseUrl}/product`, body);
    }

    deleteProduct(id: number) {
        return this._httpClient.delete<DataResponse<number>>(`${enviroment.baseUrl}/product/delete/${id}`);
    }
}
