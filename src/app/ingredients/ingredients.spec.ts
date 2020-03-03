import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciptDetailsComponent } from './recipe-details.component';

describe('RecipeDetailsComponent', () => {
  let component: ReciptDetailsComponent;
  let fixture: ComponentFixture<ReciptDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciptDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciptDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
