import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PaymentManagementService } from '../paymentmanagement.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-paymentmanagements',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './list-paymentmanagements.component.html',
  styleUrl: './list-paymentmanagements.component.css',
  providers: [PaymentManagementService]
})
export class ListPaymentManagementsComponent implements OnInit {
  title ='Payments';
  public Paymentmanagements: any;
  constructor(private _myService: PaymentManagementService) { }
  ngOnInit() {
      this.getPaymentManagements();
  }
  
  getPaymentManagements() {
  this._myService.getPaymentManagements().subscribe({
    next: (data => { this.Paymentmanagements = data }),
    error: (err => console.error(err)),
    complete: (() => console.log('finished loading'))
  });
  }

  onDelete(paymentmanagementId: string) {
    this._myService.deletePaymentManagement(paymentmanagementId);
}
}
