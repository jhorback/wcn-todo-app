import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { applyEventMapLogging } from "@domx/eventmap/applyEventMapLogging";
import { applyStateChangeRdtLogging } from "@domx/statechange/applyStateChangeRdtLogging";
import { applyStateChangeConsoleLogging } from "@domx/statechange/applyStateChangeConsoleLogging";
import { applyStateChangeErrorHandling } from "@domx/statechange/applyStateChangeErrorHandling";
import { applyImmerToStateChange } from "@domx/statechange/applyImmerToStateChange";
import { linkProp } from "@domx/linkprop";
import { TodoDataDef } from '../wcn-todo-data/TodoDataDef';
import "@material/mwc-top-app-bar-fixed";
import "@material/mwc-icon-button";
import "../wcn-todo-data/wcn-todo-sci-data";
import "../wcn-todo-list/wcn-todo-list";
import "../wcn-done-list/wcn-done-list";
import "../wcn-images-list/wcn-images-list";
import logo from '../favicon.svg'
import "./document-styles.scss";
import Style from "./wcn-todo-app.scss";


applyEventMapLogging({collapsed: false});
// applyStateChangeConsoleLogging(({collapsed: false}));
applyStateChangeRdtLogging();
applyImmerToStateChange();

/**
 * The root UI component
 */
@customElement('wcn-todo-app')
export class TodoApp extends LitElement {

  static styles = Style;

  @property()
  state = TodoDataDef.defaultState;

  render() {
    return html`
      <wcn-todo-sci-data @state-changed="${linkProp(this, "state")}"></wcn-todo-sci-data>
      <mwc-top-app-bar-fixed>
        <div slot="navigationIcon">
          <img src="${logo}" class="app-logo" alt="logo" height="32"/>
        </div>
        <div slot="title">
          TODO <span>- BROWSER NATIVE</span>
        </div>
        <div slot="actionItems">          
          <mwc-icon-button
            icon="settings_brightness"  
            @click="${this.toggleTheme}"
          ></mwc-icon-button>
        </div>
      </mwc-top-app-bar-fixed>
      <div class="content-body">
        <wcn-todo-content .state="${this.state}"></wcn-todo-content>
        <wcn-done-content .state="${this.state}"></wcn-done-content>
        <wcn-images-list .state="${this.state}"></wcn-images-list>
      </div>                      
    `
  }

  private toggleTheme() {
    document.querySelector("html")?.classList.toggle("dark-theme");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcn-todo-app': TodoApp
  }
}
