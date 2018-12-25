import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Dashboard, createDashboard } from '@refract-cms/dashboard';
import config from '../refract-cms/refract.config';
import 'typeface-roboto';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={createDashboard({ config, serverUrl: '/cms' })} />
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>
);

render(
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  // module.hot.accept('./App', renderApp);
  module.hot.accept();
}
