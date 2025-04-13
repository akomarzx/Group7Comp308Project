import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNeighborhoodHelpComponent } from './add.neighborhood.help.component';

describe('AddNeighborhoodHelpComponent', () => {
  let component: AddNeighborhoodHelpComponent;
  let fixture: ComponentFixture<AddNeighborhoodHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNeighborhoodHelpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNeighborhoodHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
