import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploaderDialogComponent } from './image-uploader-dialog.component';

describe('ImageUploaderDialogComponent', () => {
  let component: ImageUploaderDialogComponent;
  let fixture: ComponentFixture<ImageUploaderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageUploaderDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageUploaderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
