import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLikesDialogComponent } from './post-likes-dialog.component';

describe('PostLikesDialogComponent', () => {
  let component: PostLikesDialogComponent;
  let fixture: ComponentFixture<PostLikesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostLikesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostLikesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
