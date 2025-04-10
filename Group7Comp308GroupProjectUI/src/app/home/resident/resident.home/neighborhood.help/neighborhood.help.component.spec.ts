import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighborhoodHelpComponent } from './neighborhood.help.component';

describe('NeighborhoodHelpComponent', () => {
  let component: NeighborhoodHelpComponent;
  let fixture: ComponentFixture<NeighborhoodHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeighborhoodHelpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeighborhoodHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
