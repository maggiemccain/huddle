import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatheringFormComponent } from './gathering-form.component';

describe('GatheringFormComponent', () => {
  let component: GatheringFormComponent;
  let fixture: ComponentFixture<GatheringFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatheringFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatheringFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
