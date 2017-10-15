import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChurchFormComponent } from './new-church-form.component';

describe('NewChurchFormComponent', () => {
  let component: NewChurchFormComponent;
  let fixture: ComponentFixture<NewChurchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChurchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChurchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
