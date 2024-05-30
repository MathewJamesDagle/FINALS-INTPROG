import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

const baseUrl = `${environment.apiUrl}/request`;

@Injectable({ providedIn: 'root' })
export class RequestService {
  constructor(private http: HttpClient) { }

  createRequest(petId: number): Observable<any> {
    return this.http.post<any>(`${baseUrl}`, { petId });
  }

  getAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/admin`);
  }

  getRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}`);
  }

  getUserRequests(accountId: number): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/user/${accountId}`);
  }

  updateRequestStatus(id: number, status: string) {
    return this.http.put(`${baseUrl}/status/${id}`, { status });
  }

  deleteRequest(id: number): Observable<any> {
    return this.http.delete<any>(`${baseUrl}/${id}`);
  }
}
