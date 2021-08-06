import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TodoData, TodoListName, TodoDataState } from "../ctn-todo-data/ctn-todo-data";
import "../ctn-todo-list/ctn-todo-list";
import "@material/mwc-textfield"
import Style from "./ctn-todo-content.scss";

/**
 *
 */
@customElement('ctn-todo-content')
export class TodoContent extends LitElement {

  static styles = Style;

  @property()
  state:TodoDataState = TodoData.defaultState;

  render() {
    return html`
        <div class="content">      
            
          <mwc-textfield
              name="newTask"
              type="search"
              label="Add a task"
              icon="add_task"
              @change="${this.newTaskChange}"
              @keyup="${this.newTaskKeyUp}"
          ></mwc-textfield>

          <ctn-todo-list
            list-name="${TodoListName.TodoItems}"
            .todoItems="${this.state.todoItems}"
          ></ctn-todo-list>                      
        
        </div>
      
    `
  }

  private newTaskKeyUp(event: any) {
    if (event.key === "Enter") {
      this.dispatchEvent(TodoData.addTodoEvent(event.target.value));
    }
  }

  private newTaskChange(event: any) {
    // could remove
    console.log(`task input change: ${event.target.value}`);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ctn-todo-content': TodoContent
  }
}

