import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ChangePageService {

  constructor() { }
  changePage = new Subject<number>();
  chooseAdmin = new Subject<number>();
  setchangePager(succssess: number, admin: number) {
    this.changePage.next(succssess);
    this.chooseAdmin.next(admin);

  }
  getsetchangePager(): Observable<number> {

    return this.changePage.asObservable();

  }
  getUserValue(): Observable<number> {
    return this.chooseAdmin.asObservable();
  }

}
