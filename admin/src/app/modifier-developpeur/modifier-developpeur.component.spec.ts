import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDeveloppeurComponent } from './modifier-developpeur.component';

describe('ModifierDeveloppeurComponent', () => {
  let component: ModifierDeveloppeurComponent;
  let fixture: ComponentFixture<ModifierDeveloppeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierDeveloppeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierDeveloppeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
