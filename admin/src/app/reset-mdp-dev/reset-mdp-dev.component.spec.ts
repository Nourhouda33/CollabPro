import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetMdpDevComponent } from './reset-mdp-dev.component';

describe('ResetMdpDevComponent', () => {
  let component: ResetMdpDevComponent;
  let fixture: ComponentFixture<ResetMdpDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetMdpDevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetMdpDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
