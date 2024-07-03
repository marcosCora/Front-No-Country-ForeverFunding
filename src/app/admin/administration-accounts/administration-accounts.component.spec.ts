import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationAccountsComponent } from './administration-accounts.component';

describe('AdministrationAccountsComponent', () => {
  let component: AdministrationAccountsComponent;
  let fixture: ComponentFixture<AdministrationAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrationAccountsComponent]
    });
    fixture = TestBed.createComponent(AdministrationAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
