import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { RequestListComponent } from './request-list.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RequestRoutingModule
    ],
    declarations: [
        RequestListComponent
    ]
})
export class RequestModule { }