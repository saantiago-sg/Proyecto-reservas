import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}reservas`);
  }

  createReservation(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}reservas`, payload);
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}reservas/${id}`);
  }

  updateReservation(payload: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}reservas/${id}`, payload);
  }
}
