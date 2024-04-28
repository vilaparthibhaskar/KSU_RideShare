import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DriverService {

    constructor(private http:HttpClient) {}


    getDrivers() {
        return this.http.get('http://localhost:8000/drivers');
    }


    getDriver(driverId: string) {
        return this.http.get('http://localhost:8000/drivers/'+ driverId);
    }


    addDrivers(Name: string, phoneNumber: number, address: string, zipcode: string, city: string, email: string, carModel: string) {
        this.http.post('http://localhost:8000/drivers',{ Name, phoneNumber, address, zipcode, city, email, carModel })
            .subscribe((responseData) => {
                console.log(responseData);
        }); 
    }

    deleteDriver(driverId: string) {
        this.http.delete("http://localhost:8000/drivers/" + driverId)
            .subscribe(() => {
                console.log('Deleted: ' + driverId);
            });
        location.reload();
    }

    updateDriver(driverId: string,Name: string, phoneNumber: number, address: string, zipcode: string, city: string, email: string, carModel: string) {
        this.http.put("http://localhost:8000/drivers/" + 
        driverId,{ Name, phoneNumber, address, zipcode, city, email, carModel })
        .subscribe(() => {
            console.log('Updated: ' + driverId);
        });
    }
      
}

  