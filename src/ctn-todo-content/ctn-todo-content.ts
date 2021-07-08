import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import "../ctn-todo-list/ctn-todo-list";
import "@material/mwc-textfield"
import Style from "./ctn-todo-content.scss";

/**
 *
 */
@customElement('ctn-todo-content')
export class TodoContent extends LitElement {

  static styles = Style;

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

          <ctn-todo-list></ctn-todo-list>                      
        
        </div>
      
    `
  }

  private newTaskKeyUp(event: any) {
    if (event.key === "Enter") {
      console.log(`ADD TASK - task key up: ${event.target.value}`);
      alert(`ADD TASK: ${event.target.value}`)
    }
  }

  private newTaskChange(event: any) {
    console.log(`task input change: ${event.target.value}`);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ctn-todo-content': TodoContent
  }
}

