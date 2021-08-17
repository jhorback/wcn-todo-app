import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { TodoDataDef, TodoListName, TodoDataState } from "../ctn-todo-data/TodoDataDef";
import "../ctn-todo-list/ctn-todo-list";
import "@material/mwc-icon-button";
import "@material/mwc-button";
import Style from "./ctn-done-content.scss";

/**
 *
 */
@customElement('ctn-done-content')
export class DoneContent extends LitElement {

  static styles = Style;

  @property()
  state:TodoDataState = TodoDataDef.defaultState;

  @query("mwc-icon-button")
  toggleButton!:HTMLElement;

  @query(".list")
  listContainer!:HTMLElement;

  render() {
      debugger;
    if (this.state.doneItems.length === 0) {
        return html``;
    }
    
    return html`
        <div class="content">
            <div class="completed-toolbar"
                @click="${this.toggleShowContent}"
                >
                <h2>Completed (${this.state.doneItems.length})</h2>

                <mwc-button
                    @click="${this.deleteAllCompleted}"
                >
                    Delete All
                </mwc-button>
                <mwc-icon-button
                    icon="keyboard_arrow_down"
                    @click="${this.toggleShowContent}"
                ></mwc-icon-button>
            </div>
            <div class="list">
                <ctn-todo-list
                    list-name="${TodoListName.DoneItems}"
                    .todoItems="${this.state.doneItems}"
                ></ctn-todo-list>
            </div>   
        </div>      
    `
  }

  private deleteAllCompleted() {
      this.dispatchEvent(TodoDataDef.deleteAllCompletedEvent());
  }

  private toggleShowContent(event:Event) {
    event.stopPropagation();
    this.toggleButton.classList.toggle("open");
    this.listContainer.classList.toggle("open");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ctn-done-content': DoneContent
  }
}

