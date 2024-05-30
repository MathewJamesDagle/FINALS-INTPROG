import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { PetService, RequestService, AccountService } from '@app/_services';

@Component({
  templateUrl: 'requests-list.component.html',
})
export class RequestsListComponent implements OnInit {
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
    this.requestService.getAllRequests().subscribe(
      requests => {
        requests.forEach(request => {
          this.petService.getById(request.petId).subscribe(
            pet => {
              request.pet = pet;
            },
            error => {
              console.error('Error fetching pet details:', error);
            }
          );

          this.accountService.getById(request.accountId).subscribe(
            user => {
              request.user = user;
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

  approveRequest(id: number) {
    this.requestService.updateRequestStatus(id, 'approved').pipe(first()).subscribe(() => {
      this.loadRequests();
    });
  }
  
  deleteRequest(id: number) {
    this.requestService.deleteRequest(id).pipe(first()).subscribe(() => {
      this.requests = this.requests.filter(request => request.id !== id);
    });
  }
}
