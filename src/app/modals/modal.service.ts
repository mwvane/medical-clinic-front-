import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  loginModal: boolean = false;
  craeteOrUpdateCategoryModal: boolean = false;
  forgetPasswordModal: Boolean = false;
  settingsModal: boolean = false;
  usersModal: boolean = false;
}
