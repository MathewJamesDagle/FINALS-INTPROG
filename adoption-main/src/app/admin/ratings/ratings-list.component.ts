import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { RatingService } from '@app/_services';

@Component({ templateUrl: 'ratings-list.component.html' })
export class RatingsListComponent implements OnInit {
    ratings: any[];

    constructor(private ratingService: RatingService) {}

    ngOnInit() {
        this.loadRatings();
    }

    loadRatings() {
        this.ratingService.getAll().pipe(first()).subscribe(ratings => {
            this.ratings = ratings;
            console.log(this.ratings);
        });
    }

    deleteRating(id: string) {
        console.log('Deleting rating with ID:', id);
        this.ratingService.delete(id).pipe(first()).subscribe(
            () => {
                console.log('Rating deleted successfully');
                this.ratings = this.ratings.filter(rating => rating.id !== id);
            },
            error => {
                console.error('Error deleting rating:', error);
            }
        );
    }
    
}