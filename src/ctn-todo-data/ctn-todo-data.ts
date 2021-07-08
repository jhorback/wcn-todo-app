import { customElement, state } from 'lit/decorators.js';


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

    static addTodoEvent = (text: string) => new CustomEvent("add-todo", {
        detail: {text}
    });

    static markDoneEvent = (id: number) => new CustomEvent("set-todo-done", {
        detail: {id}
    });

    static deleteTodoEvent = (id: number) => new CustomEvent("delete-todo", {
        detail: {id}
    });

    state = TodoData.defaultState;
}

declare global {
  interface HTMLElementTagNameMap {
    'ctn-todo-data': TodoData
  }
}

