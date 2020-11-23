import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { TodoService } from '../todo.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  toDoListArray: any = [];
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getListFromdb();
  }

  getListFromdb() {

    debugger
    this.todoService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.toDoListArray.push(x);
      })

      //sort array isChecked false  -> true
        this.toDoListArray.sort((a,b) => {
          return a.isChecked - b.isChecked;
        })
    });
  }

  onAdd(itemTitle) {
    this.todoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  alterCheck($key: string,isChecked) {
    this.todoService.checkOrUnCheckTitle($key,!isChecked);
  }

  onDelete($key : string){
    this.todoService.removeTitle($key);
  }


}
