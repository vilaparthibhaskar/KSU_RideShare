import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaymentmanagementsComponent } from './list-paymentmanagements.component';

describe('ListPaymentmanagementsComponent', () => {
  let component: ListPaymentmanagementsComponent;
  let fixture: ComponentFixture<ListPaymentmanagementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPaymentmanagementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPaymentmanagementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
