import { html } from "https://unpkg.com/lit-html@2.3.1";

export const key = ({ note, frequency, octave }, actions) => {
  return html`<button
    @mousedown=${() => actions.onNote({ note, octave, frequency })}
    @mouseup=${() => actions.offNote({ note, octave, frequency })}
    @mouseleave=${() => actions.offNote({ note, octave, frequency })}
  >
    ${note}
  </button>`;
};
