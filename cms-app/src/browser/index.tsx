// Load polyfills (once, on the top of our web app)
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

/**
 * Frontend code running in browser
 */
import React from 'react';
import { hydrate } from "react-dom";
import { BrowserRouter } from 'react-router-dom';

import { App } from '../App';

const render = () => {
    hydrate(<BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('root'));
}

render();