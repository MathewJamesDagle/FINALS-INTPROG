import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, PetService, AlertService, RequestService } from '@app/_services';

@Component({
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
    account: any;
    pets: any[] = [];
    selectedPet: any;
    isAdmin: boolean = false;

    constructor(
        private accountService: AccountService, 
        private router: Router, 
        private petService: PetService, 
        private requestService: RequestService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.account = this.accountService.accountValue;
        this.isAdmin = this.account.role === 'Admin';

        this.loadPets();
    }

    loadPets() {
        this.petService.getAllPets().subscribe({
        next: pets => {
            this.pets = pets;
        },
        error: error => this.alertService.error(error)
        });
    }

    truncateText(text: string, limit: number): string {
        if (text.length > limit) {
            return text.substring(0, limit) + '...';
        } else {
            return text;
        }
    }

    openModal(pet: any) {
        this.selectedPet = pet;
    }
    
    closeModal() {
        this.selectedPet = null;
    }

    adoptPet(petId: number) {
        this.requestService.createRequest(petId).subscribe({
            next: () => {
                this.alertService.success('Adoption request sent successfully');
                this.router.navigate(['/request']);
            },
            error: error => {
                console.error('Error creating request:', error);
                this.alertService.error(error.message || 'Unknown error');
            }
        });
    }
}