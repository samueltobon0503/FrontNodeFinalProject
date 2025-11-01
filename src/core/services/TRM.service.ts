import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// import { TrmData } from '../models/trm-data.model';

@Injectable({
  providedIn: 'root'
})
export class TrmService {
  private apiUrl = 'http://localhost:5119';

  constructor(private http: HttpClient) { }

  public getTrmActual(): Observable<any> {
    const url = `${this.apiUrl}/WeatherForecast`;

    return this.http.get<any[]>(url).pipe(
      map(response => {
        if (response && response.length > 0) {
        //   return parseFloat(response[0].valor);
        return response;
        }
        throw new Error('No se recibieron datos de la TRM.');
      }),
      catchError(this.handleError)
    );
  }

  
  public getCurrencies(): Observable<any> {
    const url = `${this.apiUrl}/Currencies`;

    return this.http.get<any[]>(url).pipe(
      map(response => {
        if (response && response.length > 0) {
        //   return parseFloat(response[0].valor);
        return response;
        }
        throw new Error('No se recibieron datos de la moneda.');
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocurrió un error en la petición:', error.message);
    return throwError(() => new Error('Error al consultar la TRM. Por favor, intenta más tarde.'));
  }
}