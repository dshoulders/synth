import { html } from "https://unpkg.com/lit-html@2.3.1";

export const hello = ({ name }, { nameUpdate }) => {
  return html`
    <div>
      <span>Hello ${name}!</span>
      <button @click=${(_) => nameUpdate("Larry")}>Update</button>
    </div>
  `;
};
