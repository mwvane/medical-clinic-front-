import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileType } from './enum/fileType';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  @Input() selectedFile: any;
  @Input() fileType: FileType = FileType.AllImages;
  @Output() select = new EventEmitter();

  onFileUpload(data: any) {
    this.selectedFile = data.target.files[0];
    this.select.emit(this.selectedFile);
  }

  onRemove() {
    this.selectedFile = null
    this.select.emit(this.selectedFile);
  }
}
