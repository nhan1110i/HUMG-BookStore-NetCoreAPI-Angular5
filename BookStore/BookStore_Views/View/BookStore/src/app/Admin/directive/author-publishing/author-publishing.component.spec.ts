import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorPublishingComponent } from './author-publishing.component';

describe('AuthorPublishingComponent', () => {
  let component: AuthorPublishingComponent;
  let fixture: ComponentFixture<AuthorPublishingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorPublishingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorPublishingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
