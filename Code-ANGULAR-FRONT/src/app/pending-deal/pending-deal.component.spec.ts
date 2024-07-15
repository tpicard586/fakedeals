import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDealComponent } from './pending-deal.component';

describe('PendingDealComponent', () => {
  let component: PendingDealComponent;
  let fixture: ComponentFixture<PendingDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingDealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
