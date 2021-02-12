import { Pipe, PipeTransform } from "@angular/core";
import { DataTypes } from "../models/data-types";
import { Note } from "../models/note";

@Pipe({
    name: 'boardFilter'
})
export class BoardFilterPipe implements PipeTransform{
    transform(todoList: Note[], search: string = '', type: string): Note[] {
        if (!search.trim())
        {
            return todoList;
        }

        return todoList.filter(note => {
            if (type == DataTypes.title)
                return note.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
            
            if (type == DataTypes.content)
                return note.content.toLowerCase().indexOf(search.toLowerCase()) >= 0;
        });
    }
}