import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScheduleridesComponent } from './list-schedulerides.component';

describe('ListScheduleridesComponent', () => {
  let component: ListScheduleridesComponent;
  let fixture: ComponentFixture<ListScheduleridesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListScheduleridesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListScheduleridesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
