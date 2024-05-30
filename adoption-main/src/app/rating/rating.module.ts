import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RatingRoutingModule  } from './rating-routing.module';
import { RatingComponent } from './rating.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RatingRoutingModule,
        FormsModule
    ],
    declarations: [
        RatingComponent,
    ]
})
export class RatingModule { }