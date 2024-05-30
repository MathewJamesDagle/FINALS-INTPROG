import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { PetService, AlertService } from '@app/_services';
import { Pet } from '@app/_models'; // Assuming Event model is defined in _models folder

@Component({ templateUrl: 'add-pet.component.html' })
export class AddPetComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    isAddMode = true;
    selectedFile: File | null = null;
    pets: Pet[] = []; // Array to hold all pets

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private petService: PetService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            breed: ['', Validators.required],
            description: ['', Validators.required],
            sex: ['', Validators.required],
            age: ['', Validators.required], 
            color: ['', Validators.required],
            size: ['', Validators.required],
            type: ['', Validators.required],
            image: ['']
        });

        this.route.params.subscribe(params => {
            if (params['id']) {
                this.isAddMode = false;
                this.loadPet(params['id']);
            }
        });

        // Load all pets when component initializes
        this.loadAllPets();
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
        }
    }

    // Convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        this.alertService.clear();

        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        const formData = new FormData();
        formData.append('name', this.form.get('name')?.value);
        formData.append('breed', this.form.get('breed')?.value);
        formData.append('description', this.form.get('description')?.value);
        formData.append('sex', this.form.get('sex')?.value);
        formData.append('age', this.form.get('age')?.value);
        formData.append('color', this.form.get('color')?.value);
        formData.append('size', this.form.get('size')?.value);
        formData.append('type', this.form.get('type')?.value);
        if (this.selectedFile) {
            formData.append('image', this.selectedFile, this.selectedFile.name);
        }

        const request = this.isAddMode
            ? this.petService.create(formData)
            : this.petService.update(this.route.snapshot.params['id'], formData);

        request.pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Pet saved successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['/pets']);
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private loadPet(id: string) {
        this.petService.getById(id)
            .pipe(first())
            .subscribe(pet => {
                this.form.patchValue(pet);
            });
    }

    private loadAllPets() {
        this.petService.getAllPets()
            .pipe(first())
            .subscribe(pets => {
                this.pets = pets;
            });
    }

    onCancel() {
        this.router.navigate(['/pets']);
    }
}