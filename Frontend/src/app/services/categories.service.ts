import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class categoriesService {
  private apiUrl = 'https://localhost:44394/api/categories'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createCategory(category: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, category);
  }

  getCategory(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
