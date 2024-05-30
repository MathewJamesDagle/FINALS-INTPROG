import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService } from '@app/_services';
import { RatingService } from '@app/_services/rating.service'; // Import your RatingService

@Component({
  templateUrl: 'rating.component.html',
  styleUrls: ['rating.component.less']
})
export class RatingComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  isAddMode: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private ratingService: RatingService // Inject RatingService
  ) {}

  ngOnInit() {
    this.isAddMode = true; // Set to true when adding a new review
    this.form = this.formBuilder.group({
        name: ['', Validators.required],
        message: ['', Validators.required],
        rate: ['', Validators.required],
    });
}

  // Convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Reset alerts on submit
    this.alertService.clear();

    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createRating();
    } else {
      // Update rating logic can be added here if needed
    }
  }

  private createRating() {
    this.ratingService.create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Review submitted successfully', { keepAfterRouteChange: true });
          this.router.navigate(['/']); // Navigate to desired route after successful submission
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  
}
