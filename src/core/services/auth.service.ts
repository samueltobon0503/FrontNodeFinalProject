import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../config/environments/environment';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { DataResponse } from '../models/dataResponse.model';
import { SocketService } from './socket.service';

export interface UserInfo {
  email: string;
  role: string;
  name: string;
  id: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authenticated = new BehaviorSubject<boolean>(this.hasToken());
  public authenticated$ = this._authenticated.asObservable();
  private currentUserSubject = new BehaviorSubject<UserInfo | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private socketService: SocketService
  ) {
    this.loadInitialUser();
  }

  private loadInitialUser(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const userInfo: UserInfo = {
          email: decodedToken.email,
          role: decodedToken.role,
          name: decodedToken.name,
          id: decodedToken.id,
        };
        this.currentUserSubject.next(userInfo);
        this.socketService.connect(userInfo.id);
      } catch (error) {
        console.error('Token inválido en localStorage', error);
        this.logout();
      }
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getUserId(): string | null {
    const user = this.getUser();
    return user?.id || null;
  }

  check(): Observable<boolean> {
    return this.authenticated$;
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  authenticate(credentials: LoginModel) {
    return this._httpClient
      .post<{ data: string }>(`${enviroment.baseUrl}/auth/login`, credentials)
      .pipe(
        tap((response) => {
          localStorage.setItem('auth_token', response.data);

          try {
            const decodedToken: any = jwtDecode(response.data);
            const userInfo = {
              email: decodedToken.email,
              role: decodedToken.role,
              name: decodedToken.name,
              id: decodedToken.id,
            };

            localStorage.setItem('user_info', JSON.stringify(userInfo));
            this.currentUserSubject.next(userInfo);
             this.socketService.connect(userInfo.id);
          } catch (error) {
            console.error('Error al decodificar el token:', error);
          }

          this._authenticated.next(true);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error en authenticate:', error);
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    this.currentUserSubject.next(null);
    this._authenticated.next(false);
    this.socketService.disconnect();
  }

  getUser(): UserInfo {
    const currentUser = this.currentUserSubject.getValue();
    return currentUser ? currentUser : ({} as UserInfo);
  }

  createUser(body: RegisterModel) {
    return this._httpClient.post<DataResponse<any>>(
      `${enviroment.baseUrl}/User`,
      body
    );
  }
}
