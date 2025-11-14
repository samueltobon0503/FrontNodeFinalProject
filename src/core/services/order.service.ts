import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../config/environments/environment';
import { DataResponse } from '../models/dataResponse.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly _httpClient = inject(HttpClient);

  getOrders() {
    return this._httpClient.get<DataResponse<any[]>>(
      `${enviroment.baseUrl}/order`
    );
  }

  getOrdersByUser() {
    return this._httpClient.get<DataResponse<any[]>>(
      `${enviroment.baseUrl}/order/user`
    );
  }

  updateOrder(id: any, body: any) {
    return this._httpClient.patch<DataResponse<any[]>>(
      `${enviroment.baseUrl}/order/${id}/status`,
      body
    );
  }

  createOrder(body: any) {
    return this._httpClient.post<DataResponse<any[]>>(
      `${enviroment.baseUrl}/order`,
      body
    );
  }

  getAddress() {
    return this._httpClient.get<DataResponse<any[]>>(
      `${enviroment.baseUrl}/address`
    );
  }

  createAddress(body: any) {
    return this._httpClient.post<DataResponse<any[]>>(
      `${enviroment.baseUrl}/address`,
      body
    );
  }
}
