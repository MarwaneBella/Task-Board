import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { ColumnTask } from 'src/app/models/colunm-task';
import { ModalData } from 'src/app/models/modal-data';
import { Task } from 'src/app/models/task';
import { SharedService } from 'src/app/services/shared.service';
import { moveTaskBetweenColumns, updateTaskOrderInColumn } from 'src/app/store/column-task/column-task.actions';
import { selectAllColumnTasks, selectColumnsWithTasksByPriority, selectTasksInColumn } from 'src/app/store/column-task/column-task.selectors';

class DragData {
  previousColumnId : number
  newColumnId : number
  tasks : Task[]
}

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent {

  allColumnTasks$: Observable<ColumnTask[]>;
  // tasksInColumn$: Observable<Task[]>;

  constructor( private sharedService: SharedService, private store: Store) { 
    this.sharedService.filterData$.subscribe(filterData => {
      setTimeout(() => {
        this.SetColumnTasks(filterData)
      }, 1);
    });
  }

  ngOnInit() {
    
  }

  SetColumnTasks(filterData : string){
    
    if(filterData == 'Low' || filterData ==  'Medium' || filterData ==  'High'){
      this.allColumnTasks$ = this.store.pipe(select(selectColumnsWithTasksByPriority(filterData)));
      
    }
    else {
      this.allColumnTasks$ = this.store.pipe(select(selectAllColumnTasks));
    }

  }

  addNewTask(colunmId : number){
    var modalData : ModalData = {
      isopen : true,
      columnId : colunmId,
      type : 'create'
    }
    
    this.sharedService.sendDataModal(modalData);

  }

  drop(event: CdkDragDrop<any>){
    
    if (event.previousContainer === event.container) {
      const columnId =  event.previousContainer.data.colunmTask.id ;
      const currentIndex = event.currentIndex ;
      const previousIndex = event .previousIndex ;
      this.store.dispatch(updateTaskOrderInColumn({ columnId, currentIndex, previousIndex }));
    } else {
      const task = event.previousContainer.data.colunmTask.tasks[event.previousIndex];
      const previousColumnId =  event.previousContainer.data.colunmTask.id;
      const newColumnId = event.container.data.colunmTask.id ;
      const currentIndex = event.currentIndex ;
      this.store.dispatch(moveTaskBetweenColumns({ previousColumnId , newColumnId, task, currentIndex }));
    }
    
  }



}
