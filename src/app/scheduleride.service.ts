import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SchedulerideService {

    constructor(private http:HttpClient) {}


    getSchedulerides() {
        return this.http.get('http://localhost:8000/schedulerides');
    }


    getScheduleride(schedulerideId: string) {
        return this.http.get('http://localhost:8000/schedulerides/'+ schedulerideId);
    }


    addSchedulerides(source: string, destination: string, phoneNumber: number, pickupTime: string) {
        this.http.post('http://localhost:8000/schedulerides',{ source,destination, phoneNumber,pickupTime})
            .subscribe((responseData) => {
                console.log(responseData);
        }); 
    }

    deleteScheduleride(schedulerideId: string) {
        this.http.delete("http://localhost:8000/schedulerides/" + schedulerideId)
            .subscribe(() => {
                console.log('Deleted: ' + schedulerideId);
            });
        location.reload();
    }

    updateScheduleride(schedulerideId: string,source: string, destination: string, phoneNumber: number, pickupTime: string) {
        this.http.put("http://localhost:8000/schedulerides/" + 
        schedulerideId,{ source,destination, phoneNumber,pickupTime})
        .subscribe(() => {
            console.log('Updated: ' + schedulerideId);
        });
    }
      
}

  