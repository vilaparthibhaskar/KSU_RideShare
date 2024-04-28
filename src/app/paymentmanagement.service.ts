import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PaymentManagementService {

    constructor(private http:HttpClient) {}


    getPaymentManagements() {
        return this.http.get('http://localhost:8000/paymentmanagements');
    }


    getPaymentManagement(paymentmanagementId: string) {
        return this.http.get('http://localhost:8000/paymentmanagements/'+ paymentmanagementId);
    }


    addPaymentManagements(Payee: string, amount: number, reciever: string, paymenttype: string) {
        this.http.post('http://localhost:8000/paymentmanagements',{ Payee, amount, reciever, paymenttype })
            .subscribe((responseData) => {
                console.log(responseData);
        }); 
    }

    deletePaymentManagement(paymentmanagementId: string) {
        this.http.delete("http://localhost:8000/paymentmanagements/" + paymentmanagementId)
            .subscribe(() => {
                console.log('Deleted: ' + paymentmanagementId);
            });
        location.reload();
    }

    updatePaymentManagement(paymentmanagementId: string,Payee: string, amount: number, reciever: string, paymenttype: string) {
        this.http.put("http://localhost:8000/paymentmanagements/" + 
        paymentmanagementId,{ Payee, amount, reciever, paymenttype })
        .subscribe(() => {
            console.log('Updated: ' + paymentmanagementId);
        });
    }
      
}

  