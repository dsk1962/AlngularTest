import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarColumnComponent } from './toolbar-column.component';

describe('ToolbarColumnComponent', () => {
  let component: ToolbarColumnComponent;
  let fixture: ComponentFixture<ToolbarColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
