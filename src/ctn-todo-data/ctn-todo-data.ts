import { customElement } from 'lit/decorators.js';
import { TodoDataState } from "./TodoDataState";
import { EventMap, eventsListenAt, event } from "@harbr/eventmap";
import { StateChange } from "@harbr/statechange";
export { TodoData, TodoListName };


enum TodoListName {
    TodoItems = "todoItems",
    DoneItems = "doneItems"
}


/**
 * The data component
 * 
 * TODO:
 *  * Create typescript interfaces
 *  ** Do I put this in a d.ts file?
 *  * dogs is a fun one if ysomeone types get a dog in the todo list it will present a list of dogs to choose from
 *  ** This is for using a async http request and fetch example
 *  ** https://thedogapi.com/
 */
@customElement('ctn-todo-data')
@eventsListenAt("parent")
class TodoData extends EventMap(HTMLElement) {
    static defaultState : TodoDataState = {
        todoItems: [{
            text: "Get apples"
        }],
        doneItems: [{
            text: "Get bananas"
        }],
        dogs:{
            isLoading: false,
            dogItems: [{

            }]
        }
    };

    static addTodoEvent = (text: string) =>
        newEvent("add-todo", {text});

    static markDoneEvent = (listName: TodoListName, id: number) =>
        newEvent("set-todo-done", {listName, id});
    
    static clearDoneEvent = (listName: TodoListName, id: number) =>
        newEvent("clear-done", {listName, id});

    static deleteTodoEvent = (listName: TodoListName, id: number) =>
        newEvent("delete-todo", {listName, id});

    static deleteAllCompletedEvent = () =>
        newEvent("delete-completed-todos");

    state = TodoData.defaultState;

    @event("add-todo")
    addTodo({detail:{text}}:{detail:{text:string}}) {
        // StateChange.of(this)
        //     .tap(() => {})
        //     .dispatch();
        alert("Add todo YAY!!!!!!!! " + text);
    }

    @event("set-todo-done")
    setTodoDone() {
        alert("set-todo-done");
    }

    @event("clear-done")
    clearDone() {
        alert("clear-done");
    }

    @event("delete-todo")
    deleteTodo() {
        alert("delete-todo");
    }

    @event("delete-completed-todos")
    deleteCompleted() {
        alert("delete-completed-todos");
    }
}

const newEvent = (name: string, detail?: object) => new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail
});


declare global {
  interface HTMLElementTagNameMap {
    'ctn-todo-data': TodoData
  }
}

