import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import logo from './favicon.svg'
import Style from "./ctn-todo-app.scss";

console.log("Style", Style);
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('ctn-todo-app')

// @ts-ignore styles can be a string
export class TodoApp extends LitElement {

  static styles = Style;

  /**
   * The name to say "Hello" to.
   */
  @property()
  name = 'World'

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0

  render() {
    return html`
      <img src="${logo}" class="app-logo" alt="logo" />
      <span class="test">Hello, ${this.name}!</span>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
      test
      <slot></slot>
    `
  }

  private _onClick() {
    this.count++
  }

  foo(): string {
    return 'foo'
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ctn-todo-app': TodoApp
  }
}
