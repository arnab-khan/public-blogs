import { Component, inject, Inject, OnInit } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-uploader-dialog',
  imports: [ImageCropperComponent, MatDialogModule],
  templateUrl: './image-uploader-dialog.component.html',
  styleUrl: './image-uploader-dialog.component.scss'
})
export class ImageUploaderDialogComponent implements OnInit {
  private imageCompress = inject(NgxImageCompressService);
  private dialogRef = inject(MatDialogRef);

  imageChangedEvent: Event | undefined
  croppedImageUrl: SafeUrl | undefined;
  compressedImage: string | undefined;
  blobImage: Blob | null | undefined;
  imageSize: number = 0;
  imageCompressPercentage = 0;
  base64: string | null | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { imageChangedEvent: Event }
  ) { }

  ngOnInit(): void {
    this.imageChangedEvent = this.data.imageChangedEvent;
    const file = (this.imageChangedEvent.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageSize = file.size / 1024; // Convert bytes to kilobytes
      this.imageCompressPercentage = (20 / this.imageSize) * 100;
    }

  }
  imageCropped(event: ImageCroppedEvent) {
    // const objectUrl = event?.objectUrl;
    if (event) {
      // this.croppedImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      this.base64 = event?.base64;
      // this.imageCompresser();
      // console.log(this.base64); // Undefined
      console.log(event);

      this.blobImage = event.blob;
    }
  }

  async imageCompresser() {
    if (this.blobImage) {
      const base64 = await this.blobToBase64(this.blobImage);
      if (base64) {
        const MAX_MEGABYTE = 100 / 1024; // 100 KB
        this.imageCompress.getImageWithMaxSizeAndMetas({ image: base64 as string, orientation: 1, fileName: 'compressed_image' }, MAX_MEGABYTE).then(result => {
          console.log('result', result);
          this.compressedImage = result.image; // base64
          this.dialogRef.close({ compressedImage: this.compressedImage });
        }).catch(error => {
          console.error('error', error);
        })
      }
    }
  }

  blobToBase64(blob: Blob): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result!);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  closeDialog() {
    this.imageCompresser();
  }
}