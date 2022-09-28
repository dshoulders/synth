import { html } from "https://unpkg.com/lit-html@2.3.1";
import { guard } from "https://unpkg.com/lit-html@2.3.1/directives/guard.js";
import { app } from "./app.js";
import { hello } from "./hello/hello.js";

let state = {
  person: { name: "Dave" },
};

const actions = {
  nameUpdate(state, name) {
    return {
      ...state,
      person: { name },
    };
  },
};

const view = (state, actions) => {
  return html`<div>
    ${guard([state.person], () => hello(state.person, actions))}
  </div>`;
};

app({ state, actions, view }, document.body);
