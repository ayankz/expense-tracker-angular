import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCardOptionComponent } from './app-card-option.component';

describe('AppCardOptionComponent', () => {
  let component: AppCardOptionComponent;
  let fixture: ComponentFixture<AppCardOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCardOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCardOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
