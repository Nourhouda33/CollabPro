import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloppeursComponent } from './developpeurs.component';

describe('DeveloppeursComponent', () => {
  let component: DeveloppeursComponent;
  let fixture: ComponentFixture<DeveloppeursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloppeursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloppeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
