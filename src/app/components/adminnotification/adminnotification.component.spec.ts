import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminnotificationComponent } from './adminnotification.component';

describe('AdminnotificationComponent', () => {
  let component: AdminnotificationComponent;
  let fixture: ComponentFixture<AdminnotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminnotificationComponent]
    });
    fixture = TestBed.createComponent(AdminnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
