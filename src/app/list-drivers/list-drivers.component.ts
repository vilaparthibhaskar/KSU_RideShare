import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DriverService } from '../driver.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './list-drivers.component.html',
  styleUrl: './list-drivers.component.css',
  providers: [DriverService]
})
export class ListDriversComponent implements OnInit {
  title ='Driver';
  public drivers: any;
  constructor(private _myService: DriverService) { }
  ngOnInit() {
      this.getDrivers();
  }
  
  getDrivers() {
  this._myService.getDrivers().subscribe({
    next: (data => { this.drivers = data }),
    error: (err => console.error(err)),
    complete: (() => console.log('finished loading'))
  });
  }

  onDelete(driverId: string) {
    this._myService.deleteDriver(driverId);
}
}
