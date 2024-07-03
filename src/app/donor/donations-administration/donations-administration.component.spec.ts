import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationsAdministrationComponent } from './donations-administration.component';

describe('DonationsAdministrationComponent', () => {
  let component: DonationsAdministrationComponent;
  let fixture: ComponentFixture<DonationsAdministrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonationsAdministrationComponent]
    });
    fixture = TestBed.createComponent(DonationsAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
