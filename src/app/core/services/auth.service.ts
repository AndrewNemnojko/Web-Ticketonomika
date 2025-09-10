import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(code: string) {
    /*return this.http.post('/api/auth/login', { code }).pipe(
      tap(() => {})
    );*/

    if(code == "000000"){
      return of(true);
    }
    return throwError(() => ({ status: 401 }));
  }

  logout() {
    localStorage.clear();
    return this.http.post('/api/auth/logout', {}); 
  }

  isAuthenticated(): boolean {
    //return !!localStorage.getItem('currentUser');
    return true;
  }
}
