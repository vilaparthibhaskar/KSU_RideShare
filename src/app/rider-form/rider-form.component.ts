import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RiderService } from '../rider.service';
import {Router} from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface AddressComponent {
  long_name: string;
  types: string[];
}

@Component({
  selector: 'app-rider-form',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterModule],
  templateUrl: './rider-form.component.html',
  styleUrl: './rider-form.component.css',
  providers: [RiderService]
})
export class RiderFormComponent implements OnInit {
  public mode = 'Add';
  private id: any;
  private rider: any;


  constructor(private _myService: RiderService, private router:Router, public route: ActivatedRoute, private http: HttpClient) { }

  riderForm = new FormGroup({
    Name: new FormControl(''),
    phoneNumber: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    zipcode: new FormControl(''),
    email: new FormControl(''),
    carModel: new FormControl('')
  });

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('_id')) {
            this.mode = 'Edit';
            this.id = paramMap.get('_id');


            this._myService.getRider(this.id).subscribe({
                next: (data => {
        
                    this.rider = data;
                    this.riderForm.patchValue({
                        Name: this.rider.Name,
                        phoneNumber: this.rider.phoneNumber["$numberDecimal"],
                        address: this.rider.address,
                        city: this.rider.city,
                        zipcode: this.rider.zipcode,
                        email: this.rider.email,
                        carModel: this.rider.carModel,
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
    let Name = this.riderForm.get('Name')?.value ?? "";
    let address = this.riderForm.get('address')?.value ?? "";
    let city = this.riderForm.get('city')?.value ?? "";
    let zipcode = this.riderForm.get('zipcode')?.value ?? "";
    let phoneNumber = this.riderForm.get('phoneNumber')?.value ?? "";
    let email = this.riderForm.get('email')?.value ?? "";
    let carModel = this.riderForm.get('carModel')?.value ?? "";
    console.log("You submitted: " + Name + " " + email);

    if (this.mode == 'Add')
      this._myService.addRiders(Name, Number(phoneNumber), address, city, zipcode, email, carModel);
    if (this.mode == 'Edit')
      this._myService.updateRider(this.id, Name, Number(phoneNumber), address, city, zipcode, email, carModel);

    this.router.navigate(['/listRiders']);
  }

  onZipcodeChange() {
    const zipcode = this.riderForm.get('zipcode')?.value;
    if (zipcode) {
      this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=AIzaSyD3XD6mXGnEd9u1GVcz_BedNI8Q4ra_aoo`)
        .subscribe(data => {
          if (data.status === 'OK' && data.results.length > 0) {
            const city = data.results[0].address_components.find((comp: AddressComponent) => comp.types.includes('locality'));
            if (city) {
              this.riderForm.patchValue({ city: city.long_name });
            }
          }
        });
    }
  }

}
