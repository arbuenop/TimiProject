import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowServiceService {
  get windowRef() {
    return window
  }
}
