import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RiderService } from '../rider.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-riders',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './list-riders.component.html',
  styleUrl: './list-riders.component.css',
  providers: [RiderService]
})
export class ListRidersComponent implements OnInit {
  title ='Rider';
  public riders: any;
  constructor(private _myService: RiderService) { }
  ngOnInit() {
      this.getRiders();
  }
  
  getRiders() {
  this._myService.getRiders().subscribe({
    next: (data => { this.riders = data }),
    error: (err => console.error(err)),
    complete: (() => console.log('finished loading'))
  });
  }

  onDelete(riderId: string) {
    this._myService.deleteRider(riderId);
}
}
