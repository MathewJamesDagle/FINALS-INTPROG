import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RatingsRoutingModule } from './ratings-routing.module';
import { RatingsListComponent } from './ratings-list.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RatingsRoutingModule
    ],
    declarations: [
        RatingsListComponent
    ]
})
export class RatingsModule { }