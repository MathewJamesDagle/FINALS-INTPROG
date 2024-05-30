import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Rating } from '@app/_models';

const baseUrl = `${environment.apiUrl}/ratings`;

@Injectable({ providedIn: 'root' })
export class RatingService {
    private ratingSubject: BehaviorSubject<Rating>;
    public rating: Observable<Rating>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.ratingSubject = new BehaviorSubject<Rating>(null);
        this.rating = this.ratingSubject.asObservable();
    }

    public get ratingValue(): Rating {
        return this.ratingSubject.value;
    }

    getAll() {
        return this.http.get<Rating[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<Rating>(`${baseUrl}/${id}`);
    }
    
    create(params) {
        return this.http.post(baseUrl, params);
    }
    
    update(id, params) {
        return this.http.put(`${baseUrl}/${id}`, params)
            .pipe(map((rating: any) => {
                // update the current account if it was updated
                if (rating.id === this.ratingValue.id) {
                    // publish updated account to subscribers
                    rating = { ...this.ratingValue, ...rating };
                    this.ratingSubject.next(rating);
                }
                return rating;
            }));
    }
    
    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`)
    }
}