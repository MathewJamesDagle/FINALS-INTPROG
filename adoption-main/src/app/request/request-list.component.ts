import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { PetService, RequestService, AccountService } from '@app/_services';

@Component({
  templateUrl: 'request-list.component.html',
})
export class RequestListComponent implements OnInit {
  requests: any[];
  selectedRequest: any;

  constructor(
    private requestService: RequestService,
    private petService: PetService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.requestService.getRequests().subscribe(
      requests => {
        // For each request, fetch additional pet and user information
        requests.forEach(request => {
          this.petService.getById(request.petId).subscribe(
            pet => {
              request.pet = pet; // Assign the fetched pet data to the request object
            },
            error => {
              console.error('Error fetching pet details:', error);
            }
          );

          // Fetch user information using accountId
          this.accountService.getById(request.accountId).subscribe(
            user => {
              request.user = user; // Assign the fetched user data to the request object
            },
            error => {
              console.error('Error fetching user details:', error);
            }
          );
        });
        this.requests = requests;
      },
      error => {
        console.error('Error fetching requests:', error);
      }
    );
  }

  openModal(request: any) {
    this.selectedRequest = request;
  }

  closeModal() {
    this.selectedRequest = null;
  }
  
  deleteRequest(id: number) {
    this.requestService.deleteRequest(id).pipe(first()).subscribe(() => {
      this.requests = this.requests.filter(request => request.id !== id);
    });
  }
}
