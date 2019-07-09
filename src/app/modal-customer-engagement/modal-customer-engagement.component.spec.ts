import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCustomerEngagementComponent } from './modal-customer-engagement.component';

describe('ModalCustomerEngagementComponent', () => {
  let component: ModalCustomerEngagementComponent;
  let fixture: ComponentFixture<ModalCustomerEngagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCustomerEngagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCustomerEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
