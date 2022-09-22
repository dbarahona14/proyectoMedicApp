import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( private toastrService: ToastrService) { }

  showSuccess (title : string, message : string,) {
    this.toastrService.success(title, message)
  }

  showError (title : string, message : string,) {
    this.toastrService.error(title, message)
  }

  showInfo (title : string, message : string,) {
    this.toastrService.info(title, message)
  }

  showWarning (title : string, message : string,) {
    this.toastrService.warning(title, message)
  }
}
