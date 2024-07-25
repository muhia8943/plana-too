import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerprofileComponent } from './managerprofile.component';

describe('ManagerprofileComponent', () => {
  let component: ManagerprofileComponent;
  let fixture: ComponentFixture<ManagerprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
