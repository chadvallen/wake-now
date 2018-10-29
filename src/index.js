import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { AppContainer } from 'react-hot-loader';

const render = () => { 
ReactDOM.render(
<AppContainer>
    <App />
</AppContainer>, document.getElementById('root'));
}

render();

if (module.hot) {
    module.hot.accept('./App', () => {
      render();
    });
  }