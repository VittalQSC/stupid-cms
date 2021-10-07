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

import ConfigContext from "../components/ConfigContext";
import { Config } from "../server/config";
import { App } from '../App';

const config = (window as any).__CONFIG__ as Config;
delete (window as any).__CONFIG__;

const basename = config.app.URL.match(/^(?:https?:\/\/)?[^\/]+(\/?.+)?$/i)?.[1];

const render = () => {
    hydrate(<ConfigContext.Provider value={config}>
        <BrowserRouter basename={basename}>
            <App />
        </BrowserRouter>
    </ConfigContext.Provider>, document.getElementById('root'));
}

render();