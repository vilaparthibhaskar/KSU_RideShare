import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerideFormComponent } from './scheduleride-form.component';

describe('SchedulerideFormComponent', () => {
  let component: SchedulerideFormComponent;
  let fixture: ComponentFixture<SchedulerideFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulerideFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchedulerideFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});