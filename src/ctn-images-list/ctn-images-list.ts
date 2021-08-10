import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { TodoDataDef, TodoDataState, TodoListName } from "../ctn-todo-data/TodoDataDef";
import "@material/mwc-circular-progress"
import Style from "./ctn-images-list.scss";


/**
 * 
 */
@customElement('ctn-images-list')
export class ImagesList extends LitElement {

  static styles = Style;

  @property()
  state: TodoDataState = TodoDataDef.defaultState;

  render() {
    const state = this.state;

    if (state.images.urls.length === 0 && state.images.isLoading === false) {
      return html``;
    }

    return html`
       <div class="content">
       ${state.images.isLoading ? html`
              <mwc-circular-progress indeterminate></mwc-circular-progress>`:
              html``
            }
         ${state.images.urls.map((url:string, index:number) => html`
              <img src="${url}" @click="${(e:Event) => this.clickedImage(e, index)}">
          `)}          
       </div>
    `;
  }

  clickedImage(event:Event, index:number) {
    this.dispatchEvent(TodoDataDef.deleteImage(index));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ctn-images-list': ImagesList
  }
}

