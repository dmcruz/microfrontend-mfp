import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// mount function to start the app
const mount=  (el, { onNavigate, defaultHistory }) => {
  const history = defaultHistory || createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(
    <App history={history} />,
    el
  );

  return {
    onParentNavigate({ pathname: nextPathname  }) {
      console.log('Container just navigated');
      const { pathname } = history.location;
      if(pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  }
};
// if in development call mount immediately

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if(devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}
// we are running through container and we should export the mount function

export { mount };