import { html } from "https://unpkg.com/lit-html@2.3.1";
import { app } from "./app.js";
import { noteFrequencies } from "./keys/frequencies.js";
import { key } from "./keys/key.js";
import { oscillator } from "./oscillators/oscillator.js";
import { getAudioContext } from "./audioContext.js";

let initialState = {
  oscillatorControls: [
    { type: 0, volume: 1, detune: 0 },
    { type: 2, volume: 1, detune: -36 },
    { type: 3, volume: 1, detune: 36 },
  ],
  notes: {},
};

export const WAVEFORMS = ["sine", "square", "sawtooth", "triangle"];

const createOscillator = ({ frequency, type, detune }) => {
  const actx = getAudioContext();
  const osc = actx.createOscillator();

  osc.frequency.value = frequency;
  osc.detune.value = detune;
  osc.type = type;

  return osc;
};

const actions = {
  nameUpdate(state, name) {
    const person = state.person.name === name ? state.person : { name };
    return {
      ...state,
      person,
    };
  },
  oscUpdateType(state, { index, value }) {
    Object.entries(state.notes).forEach(([_, oscs]) => {
      oscs[index].type = WAVEFORMS[value];
    });
    state.oscillatorControls[index].type = value;
    return state;
  },
  oscUpdateDetune(state, { index, value }) {
    Object.entries(state.notes).forEach(([_, oscs]) => {
      oscs[index].detune.value = value;
    });
    state.oscillatorControls[index].detune = value;
    return state;
  },
  onNote(state, { note, octave, frequency }) {
    const oscs = state.oscillatorControls.map((oscControl) => {
      const osc = createOscillator({
        frequency,
        type: WAVEFORMS[oscControl.type],
        detune: parseFloat(oscControl.detune),
      });
      osc.connect(getAudioContext().destination);
      osc.start();
      return osc;
    });

    state.notes[`${note}${octave}`] = oscs;

    return state;
  },
  offNote(state, { note, octave }) {
    state.notes[`${note}${octave}`]?.forEach((osc) => {
      osc.stop();
    });

    delete state.notes[`${note}${octave}`];

    return state;
  },
};

const view = (state, actions) => {
  return html`
    <main class="synth">
      <div id="oscillators" class="oscillators">
        ${state.oscillatorControls.map((osc, index) =>
          oscillator(osc, index, actions)
        )}
      </div>
      <div class="keyboard">
        ${noteFrequencies.map((octave, octaveIndex) =>
          Object.entries(octave).map(([note, frequency]) =>
            key({ note, frequency, octave: octaveIndex + 1 }, actions)
          )
        )}
      </div>
    </main>
  `;
};

app({ state: initialState, actions, view }, document.body);
