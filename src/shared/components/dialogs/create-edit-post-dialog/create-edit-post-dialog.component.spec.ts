import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditPostDialogComponent } from './create-edit-post-dialog.component';

describe('CreateEditPostDialogComponent', () => {
  let component: CreateEditPostDialogComponent;
  let fixture: ComponentFixture<CreateEditPostDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditPostDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
