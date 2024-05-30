import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PetService } from '@app/_services';
import { Pet } from '@app/_models';

@Component({ templateUrl: 'pet-list.component.html' })
export class PetListComponent implements OnInit {
    pets: any[];

    constructor(private petService: PetService) {}

    ngOnInit() {
        this.loadPets();
    }

    loadPets() {
        this.petService.getAllPets().pipe(first()).subscribe(pets => {
            this.pets = pets;
        });
    }

    deletePet(id: string) {
        const pet = this.pets.find(x => x.id === id);
        pet.isDeleting = true;
        this.petService.deletePet(id).pipe(first()).subscribe(() => {
            this.pets = this.pets.filter(x => x.id !== id);
        });
    }
}