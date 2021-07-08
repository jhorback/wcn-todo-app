import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
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

  render() {
    return html`
        <div class="content">
            <div class="completed-toolbar">
                <h2>Completed (8)</h2>

                <mwc-button
                    @click="${this.clearCompleted}"
                >
                    Clear
                </mwc-button>
                <mwc-icon-button
                    icon="keyboard_arrow_down"
                    @click="${this.toggleShowContent}"
                ></mwc-icon-button>
            </div>
            <div class="list">
                <ctn-todo-list></ctn-todo-list>
            </div>   
        </div>      
    `
  }

  private clearCompleted() {
      alert("Clear completed items");
  }

  private toggleShowContent() {
    this.shadowRoot
        ?.querySelector("mwc-icon-button")
        ?.classList.toggle("open");

    this.shadowRoot
        ?.querySelector(".list")
        ?.classList.toggle("open");
    
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ctn-done-content': DoneContent
  }
}

