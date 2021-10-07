/**
 * Server Side Rendering
 */
import React from "react";
import { StaticRouter } from 'react-router-dom';
import { APIGatewayEvent } from "aws-lambda";
import { renderToString } from "react-dom/server";

import config from "./config";
import ConfigContext from "../components/ConfigContext";
import html from './html';
import { Stats } from "./types";

/**
 * Server-side rendering
 */
import { App } from '../App';

export default async function render(_event: APIGatewayEvent): Promise<string> {
  // The stats are generated by the Webpack Stats Plugin (`webpack-stats-plugin`)
  const stats = (await import('../../dist/stats.json')) as unknown as Stats;
  console.log(_event);
  const content = renderToString(
    <ConfigContext.Provider value={config}>
      <StaticRouter basename={config.app.URL} location={_event.path} context={{}}>
        <App />
      </StaticRouter>
    </ConfigContext.Provider>,
  );
  return html({ stats, content, config });
}