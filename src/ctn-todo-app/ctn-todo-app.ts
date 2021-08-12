import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { applyEventMapLogging } from "@harbr/eventmap/applyEventMapLogging";
import { applyStateChangeRdtLogging } from "@harbr/statechange/applyStateChangeRdtLogging";
import { applyStateChangeConsoleLogging } from "@harbr/statechange/applyStateChangeConsoleLogging";
import { applyStateChangeErrorHandling } from "@harbr/statechange/applyStateChangeErrorHandling";
import { applyImmerToStateChange } from "@harbr/statechange/applyImmerToStateChange";
import { linkProp } from "@harbr/linkprop";
import { TodoDataDef } from '../ctn-todo-data/TodoDataDef';
import "@material/mwc-top-app-bar-fixed";
import "@material/mwc-icon-button";
import "../ctn-todo-data/ctn-todo-sci-data";
import "../ctn-todo-content/ctn-todo-content";
import "../ctn-done-content/ctn-done-content";
import "../ctn-images-list/ctn-images-list";
import logo from '../favicon.svg'
import "./document-styles.scss";
import Style from "./ctn-todo-app.scss";


applyEventMapLogging({collapsed: false});
// applyStateChangeConsoleLogging(({collapsed: false}));
applyStateChangeRdtLogging();
applyImmerToStateChange();

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
      <ctn-todo-sci-data @state-changed="${linkProp(this, "state")}"></ctn-todo-sci-data>
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
          <ctn-images-list .state="${this.state}"></ctn-images-list>
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

