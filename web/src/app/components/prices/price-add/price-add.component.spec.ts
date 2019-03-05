import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceAddComponent } from './price-add.component';

describe('PriceAddComponent', () => {
  let component: PriceAddComponent;
  let fixture: ComponentFixture<PriceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
