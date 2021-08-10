import { customElement } from 'lit/decorators.js';
import { EventMap, eventsListenAt, event } from "@harbr/eventmap";
import { pipe } from  "@harbr/functional";
import { TodoDataDef, TodoDataState, TodoListName } from "./TodoDataDef";
import { StateChange } from "@harbr/statechange";
export { TodoSCData };


@customElement('ctn-todo-sc-data')
@eventsListenAt("parent")
class TodoSCData extends EventMap(HTMLElement) {    

    state = TodoDataDef.defaultState;

    constructor() {
        super();
    }

    @event("add-todo")
    addTodo({detail:{text}}:{detail:{text:string}}) {
        StateChange.of(this)
            .tap(searchImages(text))
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

    @event("delete-image")
    deleteImage({detail:{index}}:
        {detail:{index:number}}
    ) {
        StateChange.of(this)
            .next(deleteImage(index))
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


const searchImages = (text: string) => async (stateChange:StateChange) => {
    if (hasDogOrCat(text) === false) {
        return;
    }

    const requestUrl = pipe(
        getDogOrCatApiUrl,
        addParamsToApiUrl
    )(text);

    stateChange
        .next(setImagesLoading(true))
        .dispatch();

    const response = await fetch(requestUrl, {
        headers: {"x-api-key": "67aa6e7d-22e1-4fed-bb25-a26927e52576"}
    }).then(r => r.json());

    stateChange
        .next(addImageUrl(response[0].url))
        .next(setImagesLoading(false))
        .dispatch();
};


const hasDogOrCat = (text:string) => 
    text.toLowerCase().indexOf("dog") > -1 ||
    text.toLowerCase().indexOf("cat") > -1;


const getDogOrCatApiUrl = (text:string) =>
    text.toLowerCase().indexOf("dog") > -1 ?
        "https://api.thedogapi.com/v1/images/search" :
        "https://api.thecatapi.com/v1/images/search";


const addParamsToApiUrl = (requestUrl:string) => {
    const url = new URL(requestUrl);
    url.searchParams.set("size", "thumb");
    url.searchParams.set("order", "RANDOM");
    url.searchParams.set("limit", "1");
    return url.toString();
};


const setImagesLoading = (isLoading:boolean) => (state:TodoDataState) => ({
    ...state,
    images: {
        ...state.images,
        isLoading
    }
});


const addImageUrl = (url:string) => (state:TodoDataState) => ({
    ...state,
    images: {
        isLoading: false,
        urls: [
            url,
            ...state.images.urls
        ]
    }
});


const deleteImage = (index:number) => (state:TodoDataState) => ({
    ...state,
    images: {
        ...state.images,
        urls: [
            ...state.images.urls.slice(0, index),
            ...state.images.urls.slice(index+1)
        ]
    }
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