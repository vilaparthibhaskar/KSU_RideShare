import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RiderService {

    constructor(private http:HttpClient) {}


    getRiders() {
        return this.http.get('http://localhost:8000/riders');
    }


    getRider(riderId: string) {
        return this.http.get('http://localhost:8000/riders/'+ riderId);
    }


    addRiders(Name: string, phoneNumber: number, address: string, city: string, zipcode: string, email: string, carModel: string) {
        this.http.post('http://localhost:8000/riders',{ Name, phoneNumber, address, city, zipcode, email, carModel })
            .subscribe((responseData) => {
                console.log(responseData);
        }); 
    }

    deleteRider(riderId: string) {
        this.http.delete("http://localhost:8000/riders/" + riderId)
            .subscribe(() => {
                console.log('Deleted: ' + riderId);
            });
        location.reload();
    }

    updateRider(riderId: string,Name: string, phoneNumber: number, address: string, city: string, zipcode: string, email: string, carModel: string) {
        this.http.put("http://localhost:8000/riders/" + 
        riderId,{ Name, phoneNumber, address, city, zipcode, email, carModel })
        .subscribe(() => {
            console.log('Updated: ' + riderId);
        });
    }
      
}

  