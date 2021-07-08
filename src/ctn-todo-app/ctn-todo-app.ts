import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import "@material/mwc-top-app-bar-fixed";
import "@material/mwc-icon-button";
import "../ctn-todo-content/ctn-todo-content";
import "../ctn-done-content/ctn-done-content";
import logo from '../favicon.svg'
import "./document-styles.scss";
import Style from "./ctn-todo-app.scss";


/**
 * The root UI component
 */
@customElement('ctn-todo-app')
export class TodoApp extends LitElement {

  static styles = Style;

  render() {
    return html`
      <mwc-top-app-bar-fixed>
        <div slot="navigationIcon">
          <img src="${logo}" class="app-logo" alt="logo" height="32"/>
        </div>
        <div slot="title">
          TODO
          <span>
            - CONNECT.TECH            
          </span>
        </div>
        <div slot="actionItems">
          
          <mwc-icon-button
            icon="settings_brightness"  
            @click="${this.toggleTheme}"
          ></mwc-icon-button>
        </div>
        
        <div class="content-body">
          <ctn-todo-content></ctn-todo-content>
          <ctn-done-content></ctn-done-content>
        </div>
      </div>
      </mwc-top-app-bar-fixed>
                  
    `
  }

  private toggleTheme() {
    document.querySelector("html")?.classList.toggle("dark-theme");
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

  private clickClear() {
    alert("Clear");
  }

  private deleteItem(event: any) {
    alert("delete item");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ctn-todo-app': TodoApp
  }
}

