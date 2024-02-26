import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceService {
  private themeSubject = new BehaviorSubject<string>('nova-light');
  theme$ = this.themeSubject.asObservable();
  setTheme(theme: string) {
    this.themeSubject.next(theme);
  }
  constructor() { }
}
