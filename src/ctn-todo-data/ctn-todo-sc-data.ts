import { customElement } from 'lit/decorators.js';
import { EventMap, eventsListenAt, event } from "@harbr/eventmap";
import { TodoDataDef, TodoDataState, TodoListName } from "./TodoDataDef";
import { StateChange } from "@harbr/statechange";
export { TodoSCData };


@customElement('ctn-todo-sc-data')
@eventsListenAt("parent")
class TodoSCData extends EventMap(HTMLElement) {    

    state = TodoDataDef.defaultState;

    @event("add-todo")
    addTodo({detail:{text}}:{detail:{text:string}}) {
        StateChange.of(this)
            .next(addTodo(text))
            .dispatch();
    }

    @event("toggle-todo-item")
    toggleTodoItem({detail:{listName, index}}:
        {detail:{listName:TodoListName, index:number}}
    ) {
        StateChange.of(this)
            .tap(moveItem(listName, index));
    }

    @event("delete-todo")
    deleteTodo({detail:{listName, index}}:
        {detail:{listName:TodoListName, index:number}}
    ) {
        StateChange.of(this)
            .tap(deleteItem(listName, index));
    }

    @event("delete-completed-todos")
    deleteCompleted() {
        StateChange.of(this)
            .next(deleteCompleted)
            .dispatch();
    }

    dispatchChange() {
        this.dispatchEvent(new CustomEvent("state-changed"));
        console.log("STATE", this.state);
    }
}




const deleteCompleted = (state:TodoDataState) => ({
    ...state,
    doneItems: []
});


const addTodo = (text:string) => (state:TodoDataState) => ({
    ...state,
    todoItems: [{
        text,
        done: false
        },
        ...state.todoItems
    ]
});


const deleteTodoItem  = (index:number) => (state:TodoDataState) => ({
    ...state,
    todoItems: [
        ...state.todoItems.slice(0, index),
        ...state.todoItems.slice(index+1)
    ]
});


const deleteDoneItem  = (index:number) => (state:TodoDataState) => ({
    ...state,
    doneItems: [
        ...state.doneItems.slice(0, index),
        ...state.doneItems.slice(index+1)
    ]
});


const copyItemToDone = (index:number) => (state:TodoDataState) => ({
    ...state,
    doneItems: [{
        ...state.todoItems[index],
        done: true
    }, ...state.doneItems]
});


const copyItemToTodo = (index:number) => (state:TodoDataState) => ({
    ...state,
    todoItems: [{
        ...state.doneItems[index],
        done: false
    }, ...state.todoItems]
});


const deleteItem = (listName:TodoListName, index:number) =>
    (stateChange:StateChange) =>
        listName === TodoListName.TodoItems ?
            stateChange
                .next(deleteTodoItem(index))
                .dispatch() :
            stateChange
                .next(deleteDoneItem(index))
                .dispatch();


const moveItem = (listName:TodoListName, index:number) =>
    (stateChange:StateChange) =>
        listName === TodoListName.TodoItems ?
            stateChange
                .next(copyItemToDone(index))
                .next(deleteTodoItem(index))
                .dispatch() :
            stateChange
                .next(copyItemToTodo(index))
                .next(deleteDoneItem(index))
                .dispatch();


declare global {
  interface HTMLElementTagNameMap {
    'ctn-todo-sc-data': TodoSCData
  }
}