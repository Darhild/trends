import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();

// tslint:disable:no-console no-empty
if (process.env.NODE_ENV === 'production') {
    const noop = () => {};

    console.log = noop;
    console.warn = noop;
    console.error = noop;
}
