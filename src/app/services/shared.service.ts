import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';
import { ModalData } from '../models/modal-data';




@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private modalDataSubject: BehaviorSubject<ModalData> = new BehaviorSubject<ModalData>({ isopen : false });
  public modalData$ = this.modalDataSubject.asObservable();

  private filterDataSubject: BehaviorSubject<string> = new BehaviorSubject<string>('All');
  public filterData$ = this.filterDataSubject.asObservable();

  constructor() {}

  sendDataModal(modalData: ModalData) {
    this.modalDataSubject.next(modalData);
  }

  sendFilterData(filterData: string){
    this.filterDataSubject.next(filterData);
  }

}
