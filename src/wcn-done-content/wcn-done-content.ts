import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { TodoDataDef, TodoListName, TodoDataState } from "../wcn-todo-data/TodoDataDef";
import "../wcn-todo-list/wcn-todo-list";
import "@material/mwc-icon-button";
import "@material/mwc-button";
import Style from "./wcn-done-content.scss";

/**
 *
 */
@customElement('wcn-done-content')
export class DoneContent extends LitElement {

  static styles = Style;

  @property()
  state:TodoDataState = TodoDataDef.defaultState;

  @query("mwc-icon-button")
  toggleButton!:HTMLElement;

  @query(".list")
  listContainer!:HTMLElement;

  render() {
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
                <wcn-todo-list
                    list-name="${TodoListName.DoneItems}"
                    .todoItems="${this.state.doneItems}"
                ></wcn-todo-list>
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
    'wcn-done-content': DoneContent
  }
}

