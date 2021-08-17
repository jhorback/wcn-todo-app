import { LitElement, html } from 'lit';
import { classMap } from "lit/directives/class-map";
import { customElement, property } from 'lit/decorators.js';
import { TodoDataDef, TodoListName, TodoDataState } from "../wcn-todo-data/TodoDataDef";
import "../wcn-todo-list/wcn-todo-list";
import "@material/mwc-textfield"
import Style from "./wcn-todo-content.scss";

/**
 *
 */
@customElement('wcn-todo-content')
export class TodoContent extends LitElement {

  static styles = Style;

  @property()
  state:TodoDataState = TodoDataDef.defaultState;

  render() {
    return html`
        <div class="${classMap({
          "content": true,
          "has-items": this.state.todoItems.length > 0
        })}">      
            
          <mwc-textfield
              name="newTask"
              type="search"
              label="Add a task"
              icon="add_task"
              autofocus
              @keyup="${this.newTaskKeyUp}"
          ></mwc-textfield>
          
          <wcn-todo-list
            list-name="${TodoListName.TodoItems}"
            .todoItems="${this.state.todoItems}"
          ></wcn-todo-list>                      
        
        </div>
      
    `
  }

  private newTaskKeyUp(event: any) {
    if (event.key === "Enter") {
      this.dispatchEvent(TodoDataDef.addTodoEvent(event.target.value));
      event.target.value = "";
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcn-todo-content': TodoContent
  }
}

