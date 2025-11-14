import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { enviroment } from '../config/environments/environment';
import { DataResponse } from '../models/dataResponse.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: ProductModel[] = [];
  private cartCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCount.asObservable();

  constructor() {}

  private readonly _httpClient = inject(HttpClient);

  addCartItem(body: any) {
    return this._httpClient.post<DataResponse<any[]>>(
      `${enviroment.baseUrl}/cart/add`,
      body
    );
  }

  getCart() {
    return this._httpClient.get<DataResponse<any[]>>(
      `${enviroment.baseUrl}/cart`
    );
  }

  removefromCart(id: any) {
    return this._httpClient.delete<DataResponse<any[]>>(
      `${enviroment.baseUrl}/cart/${id}`
    );
  }

    checkout() {
    return this._httpClient.get<DataResponse<any[]>>(
      `${enviroment.baseUrl}/checkout/confirm`
    );
  }
}
