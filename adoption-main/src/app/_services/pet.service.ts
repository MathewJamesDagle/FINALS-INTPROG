import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Pet } from '@app/_models';

const baseUrl = `${environment.apiUrl}/pets`;

@Injectable({ providedIn: 'root' })
export class PetService {
    constructor(private http: HttpClient) {}

    getAllPets(): Observable<Pet[]> {
        return this.http.get<Pet[]>(baseUrl);
    }

    getById(id: string): Observable<Pet> {
        return this.http.get<Pet>(`${baseUrl}/${id}`);
    }

    create(petData: FormData) {
        return this.http.post(`${environment.apiUrl}/pets`, petData);
    }

    update(id: string, petData: FormData) {
        return this.http.put(`${environment.apiUrl}/pets/${id}`, petData);
    }

    deletePet(id: string): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}