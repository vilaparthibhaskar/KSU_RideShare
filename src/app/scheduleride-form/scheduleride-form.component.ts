import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { SchedulerideService } from '../scheduleride.service';
import {Router} from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-scheduleride-form',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterModule],
  templateUrl: './scheduleride-form.component.html',
  styleUrl: './scheduleride-form.component.css',
  providers: [SchedulerideService]
})
export class SchedulerideFormComponent implements OnInit {
  public mode = 'Add'; //default mode
  private id: any; //student ID
  private scheduleride: any;

  //initialize the call using StudentService 
  constructor(private _myService: SchedulerideService, private router:Router, public route: ActivatedRoute) { }

  schedulerideForm = new FormGroup({
    source: new FormControl(''),
    phoneNumber: new FormControl(''),
    destination: new FormControl(''),
    pickupTime: new FormControl(''),
  });

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('_id')) {
            this.mode = 'Edit'; /*request had a parameter _id */
            this.id = paramMap.get('_id');

            //request student info based on the id
            this._myService.getScheduleride(this.id).subscribe({
                next: (data => {
                    //read data and assign to private variable student
                    this.scheduleride = data;
                    //populate the firstName and lastName on the page
                    this.schedulerideForm.patchValue({
                        source: this.scheduleride.source,
                        destination: this.scheduleride.destination,
                        phoneNumber: this.scheduleride.phoneNumber["$numberDecimal"],
                        pickupTime: this.scheduleride.pickupTime
                    })
                }),

                error: (err => console.error(err)),
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
    let source = this.schedulerideForm.get('source')?.value ?? "";
    let destination = this.schedulerideForm.get('destination')?.value ?? "";
    let phoneNumber = this.schedulerideForm.get('phoneNumber')?.value ?? "";
    let pickupTime = this.schedulerideForm.get('pickupTime')?.value ?? "";

    if (this.mode == 'Add')
      this._myService.addSchedulerides(source, destination, Number(phoneNumber), pickupTime);
    if (this.mode == 'Edit')
      this._myService.updateScheduleride(this.id, source, destination, Number(phoneNumber), pickupTime);

    this.router.navigate(['/listSchedulerides']);
  }

}
