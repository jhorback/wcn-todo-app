import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { TodoData, TodoListName } from "../ctn-todo-data/ctn-todo-data";
import { TodoItem } from "../@types/TodoDataState";
import { ActionDetail } from "@material/mwc-list";
import "@material/mwc-list";
import "@material/mwc-list/mwc-check-list-item";
import "@material/mwc-icon";
import Style from "./ctn-todo-list.scss";


/**
 * 
 */
@customElement('ctn-todo-list')
export class TodoList extends LitElement {

  static styles = Style;

  @property({
      attribute: "list-name",
      type: String
  })
  listName : TodoListName = TodoListName.TodoItems;

  @property()
  todoItems: Array<TodoItem> = [];

  @query("mwc-list", true)
  mwcList: any;

  render() {
    return html`
        <mwc-list multi @action="${this.listSelected}">
            ${this.todoItems.map((item, index) => html`
                <mwc-check-list-item left hasMeta
                  ?selected="${item.done}"                  
                  class="${item.done ? "done" : ""}"
                  >
                    ${item.text}
                    <mwc-icon slot="meta" @click="${(event:Event) => this.deleteItem(event, index)}">delete</mwc-icon>
                </mwc-check-list-item>            
            `)}            
        </mwc-list>
    `
  }

  private deleteItem(event: Event, index: number) {
    event.stopPropagation();
    this.dispatchEvent(TodoData.deleteTodoEvent(this.listName, index));
  }

  private listSelected(event: {detail:ActionDetail}) {
    this.dispatchEvent(TodoData.toggleTodoItem(this.listName, event.detail.index));

    // sync the list element
    this.listName === TodoListName.TodoItems ?
      this.mwcList.select(new Set()) :
      this.mwcList.toggle(event.detail.index);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ctn-todo-list': TodoList
  }
}

