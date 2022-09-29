import { html } from "https://unpkg.com/lit-html@2.3.1";
import { app } from "./app.js";
import { oscillator } from "./oscillators/oscillator.js";

let initialState = {
  oscillators: [
    { waveform: 0, volume: 1, detune: 0 },
    { waveform: 2, volume: 1, detune: -36 },
    { waveform: 3, volume: 1, detune: 36 },
  ],
};

const actions = {
  nameUpdate(state, name) {
    const person = state.person.name === name ? state.person : { name };
    return {
      ...state,
      person,
    };
  },
  oscUpdateDetune(state, index, value) {
    console.log("detune");
  },
};

const view = (state, actions) => {
  return html`
    <main class="synth">
      <div id="oscillators" class="oscillators">
        ${state.oscillators.map((osc, index) =>
          oscillator(osc, index, actions)
        )}
      </div>
      <div class="keyboard">
        <button id="A4">A</button>
        <button id="B4">B</button>
      </div>
    </main>
  `;
};

app({ state: initialState, actions, view }, document.body);
