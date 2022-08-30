import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( private toastrService: ToastrService) { }

  showSuccess (message : string, title : string) {
    console.log(message);
    this.toastrService.success(title, message)
  }

  showError (message : string, title : string) {
    this.toastrService.error(title, message)
  }

  showInfo (message : string, title : string) {
    this.toastrService.info(title, message)
  }

  showWarning (message : string, title : string) {
    this.toastrService.warning(title, message)
  }
}
