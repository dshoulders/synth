import { render } from "https://unpkg.com/lit-html@2.3.1";

export const app = ({ state, actions, view }, element) => {
  const bindActions = (state, actions) => {
    const boundActions = {};

    Object.entries(actions).forEach(([key, actionFn]) => {
      boundActions[key] = (payload) => {
        const newState = actionFn(state, payload);
        render(view(newState, boundActions), element);
      };
    });

    return boundActions;
  };

  const boundActions = bindActions(state, actions);

  render(view(state, boundActions), element);
};
