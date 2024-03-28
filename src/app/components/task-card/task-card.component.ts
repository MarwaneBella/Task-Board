import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalData } from 'src/app/models/modal-data';
import { Task } from 'src/app/models/task';
import { SharedService } from 'src/app/services/shared.service';
import { removeTaskFromColumn, updateTaskInColumn } from 'src/app/store/column-task/column-task.actions';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  
  @Input()
  task : Task;
  @Input()
  columnId : number;

  isdropped1: boolean = false
  isdropped2 : boolean = false;


  constructor(private  sharedService : SharedService,  private store: Store, private datePipe: DatePipe){}


  editTask(){
    var modalData : ModalData = {
      isopen : true,
      columnId : this.columnId,
      type : 'update',
      task : this.task
    }
    this.sharedService.sendDataModal(modalData);
    this.isdropped1 = false

  }


  updatePriority(priority: 'Low' | 'Medium' | 'High'){
    var newTask = new Task()
    newTask.id = this.task.id
    newTask.name = this.task.name
    newTask.description = this.task.description
    newTask.priority = priority
    this.updateTaskToColumn(this.columnId, newTask )
    this.isdropped2 = false
  }

  deleteTaskFromColumn(columnId: number, taskId: number) {
    this.store.dispatch(removeTaskFromColumn({ columnId, taskId }));
    this.isdropped1 = false
  }

  updateTaskToColumn(columnId: number, task: Task) {
    this.store.dispatch(updateTaskInColumn({ columnId, task }));
  }


  getFormattedDate(date: Date): string {
    const today = new Date();
    const formattedDate = this.datePipe.transform(date, 'MMM d');
    const todayFormatted = this.datePipe.transform(today, 'MMM d');

    if (formattedDate === todayFormatted) {
      return 'Today - ' + formattedDate;
    } else {
      return formattedDate || '';
    }
  }


}
