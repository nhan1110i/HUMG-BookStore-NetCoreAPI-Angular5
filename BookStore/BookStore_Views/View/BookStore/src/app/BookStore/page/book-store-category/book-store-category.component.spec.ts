import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStoreCategoryComponent } from './book-store-category.component';

describe('BookStoreCategoryComponent', () => {
  let component: BookStoreCategoryComponent;
  let fixture: ComponentFixture<BookStoreCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookStoreCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookStoreCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
