import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatingsListComponent } from './ratings-list.component';

const routes: Routes = [
    { path: '', component: RatingsListComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RatingsRoutingModule { }