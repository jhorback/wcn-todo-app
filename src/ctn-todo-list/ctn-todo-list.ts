import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TodoData, TodoListName } from "../ctn-todo-data/ctn-todo-data";
import { TodoItem } from "../@types/TodoDataState";
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

  render() {
    return html`
        <mwc-list multi @selected="${this.listSelected}">
            ${this.todoItems.map((item, index) => html`
                <mwc-check-list-item left hasMeta
                  ?selected="${item.done}"
                  value="${index}"
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

  private listSelected(event: any) {
    const indexAdded = event.detail.diff.added.pop();
    const indexRemoved = event.detail.diff.removed.pop();
    indexAdded !== undefined &&
      this.dispatchEvent(TodoData.markDoneEvent(this.listName, indexAdded));
    indexRemoved !== undefined &&
      this.dispatchEvent(TodoData.clearDoneEvent(this.listName, indexRemoved));    
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ctn-todo-list': TodoList
  }
}

