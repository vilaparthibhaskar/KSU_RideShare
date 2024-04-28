import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { PaymentManagementService } from '../paymentmanagement.service';
import {Router} from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paymentmanagement-form',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterModule],
  templateUrl: './paymentmanagement-form.component.html',
  styleUrl: './paymentmanagement-form.component.css',
  providers: [PaymentManagementService]
})
export class PaymentManagementFormComponent implements OnInit {
  public mode = 'Add'; //default mode
  private id: any; //student ID
  private paymentmanagement: any;

  //initialize the call using StudentService 
  constructor(private _myService: PaymentManagementService, private router:Router, public route: ActivatedRoute) { }

  paymentmanagementForm = new FormGroup({
    Payee: new FormControl(''),
    amount: new FormControl(''),
    reciever: new FormControl(''),
    paymenttype: new FormControl(''),
    
  });


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('_id')) {
            this.mode = 'Edit'; 
            this.id = paramMap.get('_id');

            
            this._myService.getPaymentManagement(this.id).subscribe({
                next: ((data: object) => {
                    this.paymentmanagement = data;
                    this.paymentmanagementForm.patchValue({
                      Payee: this.paymentmanagement.Payee,
                      amount: this.paymentmanagement.amount["$numberDecimal"],
                      reciever: this.paymentmanagement.reciever,
                      paymenttype: this.paymentmanagement.paymenttype,
                    })
                }),

                error: ((err: object) => console.error(err)),
                complete: (() => console.log('finished loading'))
            });
        }
        else {
            this.mode = 'Add';
            this.id = null;
        }
    });
}


  onSubmit(){
    let Payee = this.paymentmanagementForm.get('Payee')?.value ?? "";
    let amount = this.paymentmanagementForm.get('amount')?.value ?? "";
    let reciever = this.paymentmanagementForm.get('reciever')?.value ?? "";
    let paymenttype = this.paymentmanagementForm.get('paymenttype')?.value ?? "";
    console.log("You submitted: " + Payee + " " + paymenttype);

    if (this.mode == 'Add')
      this._myService.addPaymentManagements(Payee, Number(amount), reciever, paymenttype);
    if (this.mode == 'Edit')
      this._myService.updatePaymentManagement(this.id, Payee, Number(amount), reciever, paymenttype);

    this.router.navigate(['/listPaymentManagements']);
  }

}
