/**
 * Copyright 2026 sawyerw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";


/**
 * `counter-app-1`
 * 
 * @demo index.html
 * @element counter-app-1
 */
export class CounterApp1 extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app-1";
  }

  constructor() {
    super();
    this.count = 0;
    this.min = 10;
    this.max = 25;
    this.count = this.min; // start at minimum

    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app-1.ar.json", import.meta.url).href +
        "/../",
    });
  }

  // Lit reactive properties
  // make sure properties reflect true for CSS
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      count: { type: Number, reflect : true },
      min: { type: Number, reflect: true },
      max: { type: Number, reflect: true },
    };
  }


  updated(changedProperties) {
  if (super.updated) {
    super.updated(changedProperties);
  }
  if (changedProperties.has('count')) {
    // do testing of the value and make it rain by calling makeItRain
    if (this.count === 21) {
      this.makeItRain();
    }
  }
}

makeItRain() {

  import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
    (module) => {
   
      setTimeout(() => {
  
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    }
  );
}

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }

      /* Change color at min or max, which is inside text */
        h3.at-min {
        color: var(--ddd-theme-default-original87Pink);
        }

        h3.at-max {
        color: var(--ddd-theme-default-original87Pink);
        }

        /* base button + padding and margin from the website DDD */
      button {
        padding: var(--ddd-spacing-3);
        margin: var(--ddd-spacing-2);
        background: var(--ddd-theme-default-beaverBlue);
        color: white;
      }

        /* hover color, in states*/
       button:hover {
        background: var(--ddd-theme-primary);
        color: white;
      }

      /* focus color, in states*/
      button:focus{
         background: var(--ddd-theme-default-keystoneYellow);
          color: black;
          border-color: var(--ddd-theme-default-keystoneYellow);
          outline: none; /* removes default blue outline */
      }

      /* Disabled state, we turn it disabled when hits min/max*/
      button[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
      }


      :host([count="18"]) h3 {
        color: var(--ddd-theme-default-keystoneYellow);
      }
      :host([count="21"]) h3 {
        color: var(--ddd-theme-default-keystoneYellow);
      }

      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--counter-app-1-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
  const atMin = this.count <= this.min;
  const atMax = this.count >= this.max;
  const numberClass = atMin ? "at-min" : atMax ? "at-max" : "";

  return html`
  <!-- confetti container with the counter and buttons inside
   also has the incrememnt and decrement actions, and disables button at min/max
   this controls the logic -->
  <confetti-container id="confetti">
    <div class="wrapper">
      <h3 class="${numberClass}">${this.count}</h3>

      <button
        @click="${this.decrement}"
        ?disabled="${atMin}"
      >
        -
      </button>

      <button
        @click="${this.increment}"
        ?disabled="${atMax}"
      >
        +
      </button>

      <slot></slot>
    </div>
    </confetti-container>
  `;
 
}

  /* Increment and decrement methods with min/max checks */
  increment() {
  if (this.count < this.max) {
    this.count++;
  }
}

decrement() {
  if (this.count > this.min) {
    this.count--;
  }
}

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterApp1.tag, CounterApp1);