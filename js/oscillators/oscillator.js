import { html } from "https://unpkg.com/lit-html@2.3.1";

export const oscillator = ({ waveform, volume, detune }, index, actions) => {
  return html`
    <div class="oscillator">
      <input
        class="slider-waveform"
        type="range"
        min="0"
        max="3"
        step="1"
        value="${waveform}"
      />
      <input
        class="slider-volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value="${volume}"
      />
      <input
        class="slider-detune"
        type="range"
        min="-100"
        max="100"
        step="1"
        value="${detune}"
        @change=${({ target: { value } }) =>
          actions.oscUpdateDetune(index, value)}
      />
    </div>
  `;
};
