import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationPostComponent } from './administration-post.component';

describe('AdministrationPostComponent', () => {
  let component: AdministrationPostComponent;
  let fixture: ComponentFixture<AdministrationPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrationPostComponent]
    });
    fixture = TestBed.createComponent(AdministrationPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
