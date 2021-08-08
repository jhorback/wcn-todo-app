import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { applyEventMapLogging } from "@harbr/eventmap/applyEventMapLogging";
import { linkProp } from "@harbr/linkprop";
import "@material/mwc-top-app-bar-fixed";
import "@material/mwc-icon-button";
import "../ctn-todo-data/ctn-todo-sc-data";
import "../ctn-todo-content/ctn-todo-content";
import "../ctn-done-content/ctn-done-content";
import logo from '../favicon.svg'
import "./document-styles.scss";
import Style from "./ctn-todo-app.scss";
import { TodoDataDef } from '../ctn-todo-data/TodoDataDef';


applyEventMapLogging({collapsed: true});

/**
 * The root UI component
 */
@customElement('ctn-todo-app')
export class TodoApp extends LitElement {

  static styles = Style;

  @property()
  state = TodoDataDef.defaultState;

  render() {
    return html`
      <ctn-todo-sc-data @state-change="${linkProp(this, "state")}"></ctn-todo-sc-data>
      <mwc-top-app-bar-fixed>
        <div slot="navigationIcon">
          <img src="${logo}" class="app-logo" alt="logo" height="32"/>
        </div>
        <div slot="title">
          TODO <span>- CONNECT.TECH</span>
        </div>
        <div slot="actionItems">          
          <mwc-icon-button
            icon="settings_brightness"  
            @click="${this.toggleTheme}"
          ></mwc-icon-button>
        </div>
        
        <div class="content-body">
          <ctn-todo-content .state="${this.state}"></ctn-todo-content>
          <ctn-done-content .state="${this.state}"></ctn-done-content>
        </div>
      </div>
      </mwc-top-app-bar-fixed>                
    `
  }

  private toggleTheme() {
    document.querySelector("html")?.classList.toggle("dark-theme");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ctn-todo-app': TodoApp
  }
}

