import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ModalData } from 'src/app/models/modal-data';
import { Task } from 'src/app/models/task';
import { SharedService } from 'src/app/services/shared.service';
import { addTaskToColumn, updateTaskInColumn } from 'src/app/store/column-task/column-task.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  
  isOpen : boolean = false
  taskForm: FormGroup;
  modalData : ModalData
  task : Task = new Task();

  constructor(private formBuilder: FormBuilder, private sharedService: SharedService, private store: Store) { 
    this.sharedService.modalData$.subscribe(modalData => {
      setTimeout(() => {
        this.modalData = modalData 
        this.isOpen = modalData.isopen;
        if(this.modalData.type == 'update'){
          this.setTaskFormData()
        }
      }, 1);
    });
  }

  ngOnInit(): void {
    this.inializeTaskForm()
    
  }

  inializeTaskForm(){
    this.taskForm = this.formBuilder.group({
      taskname: ['', Validators.required],
      description: ['', Validators.maxLength(200)],
      priority: ['Low'] // Default value for priority
    });
  }

  setTaskFormData(){

    if (this.modalData.task !== undefined) {

      this.task = this.modalData.task;
      const taskData = {
        taskname: this.task.name,
        description: this.task.description,
        priority: this.task.priority // Setting priority to High
      };

      // Patching the retrieved data into the form
      this.taskForm.patchValue(taskData);
    }

    
  }

  // Optionally, you can handle form submission
  onSubmit() {


    // create 
    if (this.taskForm.valid) {
      
      if (this.modalData.columnId !== undefined) {

        var newTask = new Task() 
        newTask.id = this.task.id
        newTask.name = this.taskForm.controls['taskname'].value;
        newTask.description = this.taskForm.controls['description'].value;
        newTask.priority = this.taskForm.controls['priority'].value;
        
        // Create
        if(this.modalData.type == 'create'){
          this.addTaskToColumn(this.modalData.columnId, newTask)
        }
        // update
        else if( this.modalData.type == 'update'){
          newTask.id = this.task.id 
          this.updateTaskToColumn(this.modalData.columnId, newTask)
        }
        this.closeModal()
      }

      
      
    }

    


  }

  closeModal(){
    this.inializeTaskForm()
    this.isOpen = false
  }

  addTaskToColumn(columnId: number, task: Task) {
    this.store.dispatch(addTaskToColumn({ columnId, task }));
  }

  updateTaskToColumn(columnId: number, task: Task) {
    this.store.dispatch(updateTaskInColumn({ columnId, task }));
  }
  
  

}
