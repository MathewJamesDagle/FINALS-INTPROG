import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { ListComponent } from './list.component';
import { RatingComponent } from './rating.component';

const routes: Routes = [
    { path: '', component: RatingComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RatingRoutingModule { }