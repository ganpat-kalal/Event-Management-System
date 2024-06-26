import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:44394/api/users'; // Replace with your actual API URL
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') as string)
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.loggedIn.next(!!localStorage.getItem('currentUser'));
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.loggedIn.next(true);

          return user;
        })
      );
  }

  register(user: any) {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.currentUserSubject.next(null);
  }
}
