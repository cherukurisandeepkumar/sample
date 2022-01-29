import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportCndnComponent } from './export-cndn.component';

describe('ExportCndnComponent', () => {
  let component: ExportCndnComponent;
  let fixture: ComponentFixture<ExportCndnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportCndnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportCndnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
