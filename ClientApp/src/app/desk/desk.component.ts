import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeskService } from '../shared/desk.service';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css']
})
export class DeskComponent implements OnInit {
  searchingString: string = '';

  constructor(public deskService: DeskService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void { 
    this.spinner.show();
    this.getAllItems();
  }

  public getAllItems(){
    this.deskService.getAllItems().subscribe(data => {
      this.deskService.todoList = data;
      this.spinner.hide();
    })
  }

  public removeItem(id: number)
  {
    this.deskService.removeItem(id).subscribe(data => {
      console.log(data);
      this.getAllItems();
    });
  }

  public removeAnyItems()
  {
    this.deskService.removeAnyItems().subscribe(data => {
      console.log(data);
      this.getAllItems();
    })
  }

  public onChange(id: number)
  {
    this.deskService.onToggle(id).subscribe(data => {
      console.log(data);
      this.getAllItems();
    });
  }

  public getCompletedItemsCount(): number{
    return this.deskService.todoList.filter(i => i.completed === true).length; 
  }
}
