import { customElement } from 'lit/decorators.js';
import { EventMap, eventsListenAt, event } from "@harbr/eventmap";
import { TodoDataDef, TodoListName } from "./TodoDataDef";
export { TodoData };


@customElement('ctn-todo-data')
@eventsListenAt("parent")
class TodoData extends EventMap(HTMLElement) {    

    state = TodoDataDef.defaultState;

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
        this.dispatchEvent(new CustomEvent("state-changed"));
        console.log("STATE", this.state);
    }
}


declare global {
  interface HTMLElementTagNameMap {
    'ctn-todo-data': TodoData
  }
}

