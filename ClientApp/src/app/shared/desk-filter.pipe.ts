import { Pipe, PipeTransform } from "@angular/core";
import { Todo } from "./desk.service";

@Pipe({
    name: 'deskFilter'
})
export class DeskFilterPipe implements PipeTransform{
    transform(todoList: Todo[], search: string = ''): Todo[] {
        if (!search.trim())
        {
            return todoList;
        }

        return todoList.filter(list => { 
            return list.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
        })
    }
}