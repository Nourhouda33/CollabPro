import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../Service/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Tache } from '../Entity/Tache.Entity';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoForm: FormGroup;
  tasks : Tache[]=[];
  inprogress : Tache[]=[];
  done : Tache[]=[];
  updateIndex : any;
  isEditEnabled : boolean =false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required] // Utilisation correcte de Validators.required
    });
  }
  addTask(){
    this.tasks.push({
      discription:this.todoForm.value.item,
      done:false
    });
    this.todoForm.reset();
  }
  deleteTask(i : number){
    this.tasks.splice(i,1)

  }
  deleteinprogress(i : number){
    this.inprogress.splice(i,1)

  }
  deletedone(i : number){
    this.done.splice(i,1)

  }
  onEdit(item:Tache,i:number){
    this.todoForm.controls['item'].setValue(item.discription);
    this.updateIndex=i;
    this.isEditEnabled=true;
  }
  updateTask(){
    this.tasks[this.updateIndex].discription=this.todoForm.value.item;
    this.tasks[this.updateIndex].done=false;
    this.todoForm.reset();
    this.updateIndex=undefined;
    this.isEditEnabled=false;
  }

  drop(event: CdkDragDrop<Tache[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }





}
