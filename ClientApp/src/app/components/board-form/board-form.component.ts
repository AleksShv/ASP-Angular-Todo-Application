import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTypes } from 'src/app/models/data-types';
import { Note } from 'src/app/models/note';
import { SortingService } from 'src/app/services/sorting.service';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css']
})
export class BoardFormComponent implements OnInit {
  order: number = 1;
  sortingType: string = DataTypes.id;
  createItemForm: FormGroup;

  @Input() filter: string = '';
  @Output() filterChange = new EventEmitter<string>();
  
  filterType: string = DataTypes.title;
  @Output() filterTypeChange = new EventEmitter<string>();
 
  constructor(
    private boardService: BoardService,
    private sortingService: SortingService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.createItemForm = this.formBuilder.group({
      "title": [null, [Validators.required, Validators.minLength(3), Validators.maxLength(55)]],
      "content": [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  // FILTER
  public onFilterChange(model: string) {
    this.filter = model;
    this.filterChange.emit(model);
  }

  public onFilterTypeChange(model: string) {
    this.filterTypeChange.emit(model);
  }

  public filterByTitle() {
    this.filterType = DataTypes.title;
  }

  public filterByContent() {
    this.filterType = DataTypes.content;
  }

  // SORTING
  public setOrder(order: number){
    this.order = order;
  }

  public sortById(){
    this.sortingService.sortById(this.boardService.todoList, this.order);
    this.sortingType = DataTypes.id;
  }

  public sortByTitle(){
    this.sortingService.sortByTitle(this.boardService.todoList, this.order);
    this.sortingType = DataTypes.title;
  }

  public sortByContent(){
    this.sortingService.sortByContent(this.boardService.todoList, this.order);
    this.sortingType = DataTypes.content;
  }

  public sortByDate(){
    this.sortingService.sortByDate(this.boardService.todoList, this.order);
    this.sortingType = DataTypes.date;
  }

  public sortByCompleted(){
    this.sortingService.sortByCompleted(this.boardService.todoList, this.order);
    this.sortingType = DataTypes.completed;
  }

  // NOTE
  public getAllItems(){
    this.boardService.getAllItems().subscribe(
      result => this.boardService.todoList = result
    );
  }

  public removeAnyItems()
  {
    this.boardService.removeAnyItems().subscribe(
      result => {
        console.log(result);
        this.getAllItems();
      }
    )
  }

  public getLength(): number{
    return this.boardService.todoList.length;
  }

  public getCompletedItemsCount(): number{
    return this.boardService.todoList.filter(i => i.completed === true).length; 
  }

  public addNote()
  {
    const note: Note = {
      title: this.createItemForm.get("title").value,
      content: this.createItemForm.get("content").value
    }

    note.title.trim();
    note.content.trim();

    this.addItem(note);
    this.createItemForm.reset();
  }

  private addItem(todo: Note)
  {
    this.boardService.addItem(todo).subscribe(
      result => {
        console.log(result);
        this.getAllItems();
      }
    );
  }
}