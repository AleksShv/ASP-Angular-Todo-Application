import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataTypes } from 'src/app/models/data-types';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  filter: string = '';
  filterType: string = DataTypes.title;
  changeItem: number = -1;

  constructor(
    private boardService: BoardService, 
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void { 
    this.getAllItems();
  }

  public onFilterTypeChange(model: any){
      this.filterType = model;
  }

  public getNotes(){
    return this.boardService.todoList;
  }

  public editItem(index: number, mode: boolean){
    if (!mode){
      this.changeItem = -1;
      return;
    }

    this.changeItem = index;
  }

  public getAllItems(){
    this.boardService.getAllItems().subscribe(
      result => {
        console.log(result);
        this.boardService.todoList = result;
      }
    );
  }

  public removeItem(id: number)
  {
    this.boardService.removeItem(id).subscribe(
      result => {
        console.log(result);
        this.getAllItems();
      }
    );
  }

  public completeItem(id: number)
  {
    this.boardService.onToggle(id).subscribe(
      result => {
        console.log(result);
        this.getAllItems();
      }
    );
  }

  public updateItem(){
  }

  public getLength(): number{
    return this.boardService.todoList.length;
  }
}
