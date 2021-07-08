import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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
      attribute: "include-add-entry",
      type: Boolean
  })
  includeAddEntry = false;

  render() {
    return html`
        <mwc-list multi @selected="${this.listSelected}">
            ${new Array(7).fill(0).map((item, index) => html`
                <mwc-check-list-item left hasMeta value="${index+3}">
                    Get ${index} Apples
                    <mwc-icon slot="meta" @click="${(event) => this.deleteItem(event, index)}">delete</mwc-icon>
                </mwc-check-list-item>            
            `)}            
        </mwc-list>
    `
  }

  private deleteItem(event: any, index: number) {
    event.stopPropagation();
    alert("delete item " + index);
  }

  private listSelected(event: any) {
      alert(`list selection changed ${Array.from(event.detail.index)}`)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ctn-todo-list': TodoList
  }
}

