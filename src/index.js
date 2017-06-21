import React from 'react';
import ReactDOM from 'react-dom';
import Client from './Client';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

ReactDOM.render(<Client />, document.getElementById('root'));
registerServiceWorker();
