import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private loggedInUserEmailSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public loggedInUserEmail$: Observable<string | null> = this.loggedInUserEmailSubject.asObservable();

  constructor() {}

  setLoggedInUserEmail(email: string | null): void {
    this.loggedInUserEmailSubject.next(email);
  }

  getLoggedInUserEmail(): string | null {
    return this.loggedInUserEmailSubject.value;
  }
}
