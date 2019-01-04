import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDetailComponent } from './shop-detail.component';

describe('ShopDetailComponent', () => {
  let component: ShopDetailComponent;
  let fixture: ComponentFixture<ShopDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
