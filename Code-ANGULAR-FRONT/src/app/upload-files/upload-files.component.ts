import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UploadFileService } from '../services/UploadFileService';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  uploadForm: FormGroup;

  fileInfos: Observable<any>;

  constructor(private uploadService: UploadFileService, private fb: FormBuilder, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      file: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required]
    })
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    if (this.uploadForm.invalid) {
      return;
    }
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile, this.uploadForm.controls.description.value, this.uploadForm.controls.link.value).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.snackbar.open(`Thank you for your deal 👏; The team must check it before publish it`, 'close', {
            duration: 10 * 1000
          })
          this.uploadForm.reset();
        }
      },
      err => {
        this.progress = 0;
        this.currentFile = undefined;
        this.snackbar.open(`Your deal is pending validation !`, 'close', {
          duration: 10 * 1000
        })
        this.uploadForm.reset();
      });

    this.selectedFiles = undefined;
  }
}
