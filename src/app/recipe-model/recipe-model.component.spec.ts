import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeModelComponent } from './recipe-model.component';

describe('RecipeModelComponent', () => {
  let component: RecipeModelComponent;
  let fixture: ComponentFixture<RecipeModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
