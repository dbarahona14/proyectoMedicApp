import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( private toastrService: ToastrService) { }

  showSuccess (title : string, message : string,) {
    this.toastrService.success(message, title);
  }

  showError (title : string, message : string,) {
    this.toastrService.error(message, title);
  }

  showInfo (title : string, message : string,) {
    this.toastrService.info(message, title);
  }

  showWarning (title : string, message : string,) {
    this.toastrService.warning(message, title);
  }
}
