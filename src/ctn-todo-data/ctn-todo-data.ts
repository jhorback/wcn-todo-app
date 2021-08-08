import { customElement } from 'lit/decorators.js';
import { TodoDataState, TodoItem } from "../@types/TodoDataState";
export * from "../@types/TodoDataState";
import { applyEventMapLogging } from "@harbr/eventmap/applyEventMapLogging";
import { EventMap, eventsListenAt, event } from "@harbr/eventmap";
import { StateChange } from "@harbr/statechange";
export { TodoData, TodoListName };


applyEventMapLogging({collapsed: true});

enum TodoListName {
    TodoItems = "todoItems",
    DoneItems = "doneItems"
}


@customElement('ctn-todo-data')
@eventsListenAt("parent")
class TodoData extends EventMap(HTMLElement) {
    static defaultState : TodoDataState = {
        todoItems: [],
        doneItems: [],
        dogs:{
            isLoading: false,
            dogItems: []
        }
    };

    static addTodoEvent = (text: string) =>
        newEvent("add-todo", {text});

    static toggleTodoItem = (listName: TodoListName, index: number) =>
        newEvent("toggle-todo-item", {listName, index});

    static deleteTodoEvent = (listName: TodoListName, index: number) =>
        newEvent("delete-todo", {listName, index});

    static deleteAllCompletedEvent = () =>
        newEvent("delete-completed-todos");

    state = TodoData.defaultState;

    @event("add-todo")
    addTodo({detail:{text}}:{detail:{text:string}}) {
        this.state = {
            ...this.state,
            todoItems: [{
                text,
                done: false
                },
                ...this.state.todoItems
            ]
        };
        this.dispatchChange();
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
    deleteTodo({detail:{listName, index}}:
        {detail:{listName:TodoListName, index:number}}
    ) {
        if (listName === TodoListName.TodoItems) {
            this.state.todoItems.splice(index, 1)[0]
            this.state = {
                ...this.state,
                doneItems: [...this.state.doneItems],
                todoItems: [...this.state.todoItems]
            };
        } else {
            this.state.doneItems.splice(index, 1)[0];
            this.state = {
                ...this.state,
                doneItems: [...this.state.doneItems],
                todoItems: [...this.state.todoItems]
            };
        }
        this.dispatchChange();
    }

    @event("delete-completed-todos")
    deleteCompleted() {
        this.state = {
            ...this.state,
            doneItems: []
        };
        this.dispatchChange();
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

