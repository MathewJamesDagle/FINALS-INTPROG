import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PetsRoutingModule } from './pets-routing.module';
import { PetListComponent } from './pet-list.component';
import { AddPetComponent } from './add-pet.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PetsRoutingModule
    ],
    declarations: [
        PetListComponent,
        AddPetComponent
    ]
})
export class PetsModule { }