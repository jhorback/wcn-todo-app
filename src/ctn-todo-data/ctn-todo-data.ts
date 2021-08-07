import { customElement } from 'lit/decorators.js';
import { TodoDataState, TodoItem } from "../@types/TodoDataState";
export * from "../@types/TodoDataState";
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
            text: "Get apples",
            done: false
        }],
        doneItems: [{
            text: "Get bananas",
            done: true
        }, {
            text: "Get dogs",
            done: true
        }],
        dogs:{
            isLoading: false,
            dogItems: []
        }
    };

    static addTodoEvent = (text: string) =>
        newEvent("add-todo", {text});

    static toggleTodoItem = (listName: TodoListName, index: number) =>
        newEvent("toggle-todo-item", {listName, index});
    
    static clearDoneEvent = (listName: TodoListName, index: number) =>
        newEvent("clear-done", {listName, index});

    static deleteTodoEvent = (listName: TodoListName, index: number) =>
        newEvent("delete-todo", {listName, index});

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

    @event("toggle-todo-item")
    toggleTodoItem({detail:{listName, index}}:
        {detail:{listName:TodoListName, index:number}}
    ) {
        if (listName === TodoListName.TodoItems) {
            const item = {
                ...this.state.todoItems.splice(index, 1)[0]
            };
            item.done = true;
            this.state.doneItems.unshift(item);
            this.state = {
                ...this.state,
                doneItems: [...this.state.doneItems],
                todoItems: [...this.state.todoItems]
            };
        } else {
            const item = {
                ...this.state.doneItems.splice(index, 1)[0]
            };
            item.done = false;
            this.state.todoItems.unshift(item);
            this.state = {
                ...this.state,
                doneItems: [...this.state.doneItems],
                todoItems: [...this.state.todoItems]
            };
        }
        this.dispatchChange();
    }

    @event("delete-todo")
    deleteTodo() {
        alert("delete-todo");
    }

    @event("delete-completed-todos")
    deleteCompleted() {
        alert("delete-completed-todos");
    }

    dispatchChange() {
        this.dispatchEvent(new CustomEvent("state-change"));
        console.log("STATE", this.state);
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

