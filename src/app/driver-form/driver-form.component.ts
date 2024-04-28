import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { DriverService } from '../driver.service';
import {Router} from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface AddressComponent {
  long_name: string;
  types: string[];
}

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterModule],
  templateUrl: './driver-form.component.html',
  styleUrl: './driver-form.component.css',
  providers: [DriverService]
})
export class DriverFormComponent implements OnInit {
  public mode = 'Add';
  private id: any; 
  private driver: any;


  constructor(private _myService: DriverService, private router:Router, public route: ActivatedRoute, private http: HttpClient) { }

  driverForm = new FormGroup({
    Name: new FormControl(''),
    phoneNumber: new FormControl(''),
    address: new FormControl(''),
    zipcode: new FormControl(''),
    city: new FormControl(''),
    email: new FormControl(''),
    carModel: new FormControl('')
  });

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('_id')) {
            this.mode = 'Edit'; 
            this.id = paramMap.get('_id');

            
            this._myService.getDriver(this.id).subscribe({
                next: (data => {
                    this.driver = data;
                    this.driverForm.patchValue({
                        Name: this.driver.Name,
                        phoneNumber: this.driver.phoneNumber["$numberDecimal"],
                        address: this.driver.address,
                        zipcode: this.driver.zipcode,
                        city: this.driver.city,
                        email: this.driver.email,
                        carModel: this.driver.carModel,
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
    let Name = this.driverForm.get('Name')?.value ?? "";
    let address = this.driverForm.get('address')?.value ?? "";
    let phoneNumber = this.driverForm.get('phoneNumber')?.value ?? "";
    let email = this.driverForm.get('email')?.value ?? "";
    let carModel = this.driverForm.get('carModel')?.value ?? "";
    let zipcode = this.driverForm.get('zipcode')?.value ?? "";
    let city = this.driverForm.get('city')?.value ?? "";
    console.log("You submitted: " + Name + " " + email);

    if (this.mode == 'Add')
      this._myService.addDrivers(Name, Number(phoneNumber), address, zipcode, city, email, carModel);
    if (this.mode == 'Edit')
      this._myService.updateDriver(this.id, Name, Number(phoneNumber), address, zipcode, city, email, carModel);

    this.router.navigate(['/listDrivers']);
  }

  onZipcodeChange() {
    const zipcode = this.driverForm.get('zipcode')?.value;
    if (zipcode) {
      this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=AIzaSyD3XD6mXGnEd9u1GVcz_BedNI8Q4ra_aoo`)
        .subscribe(data => {
          if (data.status === 'OK' && data.results.length > 0) {
            const city = data.results[0].address_components.find((comp: AddressComponent) => comp.types.includes('locality'));
            if (city) {
              this.driverForm.patchValue({ city: city.long_name });
            }
          }
        });
    }
  }

}
