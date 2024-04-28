import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SchedulerideService } from '../scheduleride.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-schedulerides',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './list-schedulerides.component.html',
  styleUrl: './list-schedulerides.component.css',
  providers: [SchedulerideService]
})
export class ListScheduleridesComponent implements OnInit {
  title ='Scheduleride';
  public schedulerides: any;
  constructor(private _myService: SchedulerideService) { }
  ngOnInit() {
      this.getSchedulerides();
  }

  getSchedulerides() {
  this._myService.getSchedulerides().subscribe({
    next: (data => { this.schedulerides = data }),
    error: (err => console.error(err)),
    complete: (() => console.log('finished loading'))
  });
  }

  onDelete(schedulerideId: string) {
    this._myService.deleteScheduleride(schedulerideId);
}
}
