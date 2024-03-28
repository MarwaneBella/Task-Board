import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ColumnTask } from './models/colunm-task';
import { Task } from './models/task';
import { Store, select } from '@ngrx/store';
import { selectAllColumnTasks, selectTasksInColumn } from './store/column-task/column-task.selectors';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task-manager';



  // list = ['To-do','In Progress','Review','Completed']
  
  // listColunmTask : any[] = [
  //   {
  //     title : 'To-do',
  //     tasks : [
  //       {
  //         name:'test',
  //         description:'hhhhhhhhhhhhhhhhhh'
  //       }
  //     ]
  //   },
  //   {
  //     title : 'In Progress',
  //     tasks : [
  //       {
  //         name:'test2',
  //         description:'ggggggggggggggg'
  //       },
  //       {
  //         name:'test3',
  //         description:'ddhdsjhsdh'
  //       }
  //     ]
  //   },
  //   {
  //     title : 'Review',
  //     tasks : []
  //   },{
  //     title : 'Completed',
  //     tasks : []
  //   },

  // ]
  
}
