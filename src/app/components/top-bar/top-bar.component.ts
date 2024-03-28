import { Component } from '@angular/core';
import { ModalData } from 'src/app/models/modal-data';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {

  isdropped : boolean = false
  currentFilter : string = 'All'

  constructor(private sharedService: SharedService) {}


  filterData(filter : string){
    this.currentFilter = filter
    this.isdropped  = false
    this.sharedService.sendFilterData(filter);
    
  }


  addTask(){
    var modalData : ModalData = {
      isopen : true,
      columnId : 1,
      type : 'create',
    }
    this.sharedService.sendDataModal(modalData);

  }
}
