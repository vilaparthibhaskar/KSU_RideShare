import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentManagementFormComponent } from './paymentmanagement-form.component';

describe('PaymentManagementFormComponent', () => {
  let component: PaymentManagementFormComponent;
  let fixture: ComponentFixture<PaymentManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentManagementFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});