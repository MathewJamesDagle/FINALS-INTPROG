import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetListComponent } from './pet-list.component';
import { AddPetComponent } from './add-pet.component';

const routes: Routes = [
    { path: '', component: PetListComponent },
    { path: 'add', component: AddPetComponent },
    { path: 'edit/:id', component: AddPetComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PetsRoutingModule { }