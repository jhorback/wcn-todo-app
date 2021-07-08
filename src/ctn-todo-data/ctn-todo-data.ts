import { customElement } from 'lit/decorators.js';


export enum TodoListName {
    TodoItems = "todoItems",
    DoneItems = "doneItems"
}


/**
 * The data component
 * 
 * TODO:
 *  * Create typescript interfaces
 *  ** Do I put this in a d.ts file?
 *  * dogs is a fun one if someone types get a dog in the todo list it will present a list of dogs to choose from
 *  ** This is for using a async http request and fetch example
 *  ** https://thedogapi.com/
 */
@customElement('ctn-todo-data')
export class TodoData extends HTMLElement {
    static defaultState = {
        todoItems: [{
            text: "Get apples"
        }],
        doneItems: [{
            text: "Get bananas"
        }],
        dogs:{
            isLoading: false,
            dogList: [{

            }]
        }
    };

    static addTodoEvent = (text: string) => newEvent("add-todo", {text});

    static markDoneEvent = (listName: TodoListName, id: number) =>
        newEvent("set-todo-done", {listName, id});
    
    static clearDoneEvent = (listName: TodoListName, id: number) =>
        newEvent("set-todo-done", {listName, id});

    static deleteTodoEvent = (listName: TodoListName, id: number) =>
        newEvent("delete-todo", {listName, id});

    static deleteAllCompletedEvent = () => newEvent("delete-completed-todos");

    state = TodoData.defaultState;
}

const newEvent = (name: string, detail?: object) => new CustomEvent(name, {
    bubbles: true,
    detail
});


declare global {
  interface HTMLElementTagNameMap {
    'ctn-todo-data': TodoData
  }
}

