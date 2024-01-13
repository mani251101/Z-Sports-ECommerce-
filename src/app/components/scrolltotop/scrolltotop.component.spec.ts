import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrolltotopComponent } from './scrolltotop.component';

describe('ScrolltotopComponent', () => {
  let component: ScrolltotopComponent;
  let fixture: ComponentFixture<ScrolltotopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrolltotopComponent]
    });
    fixture = TestBed.createComponent(ScrolltotopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
