import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCndnComponent } from './upload-cndn.component';

describe('UploadCndnComponent', () => {
  let component: UploadCndnComponent;
  let fixture: ComponentFixture<UploadCndnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCndnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCndnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
