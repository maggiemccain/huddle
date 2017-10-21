import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatheringProfileComponent } from './gathering-profile.component';

describe('GatheringProfileComponent', () => {
  let component: GatheringProfileComponent;
  let fixture: ComponentFixture<GatheringProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatheringProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatheringProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
