import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as BR } from 'react-router-dom';

const render = () => { 
ReactDOM.render(
<AppContainer>
  <BR>
    <App />
  </BR>
</AppContainer>, document.getElementById('root'));
}

render();

if (module.hot) {
    module.hot.accept('./App', () => {
      render();
    });
  }