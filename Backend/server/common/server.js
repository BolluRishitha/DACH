/*import Express from 'express';


import cors from 'cors';

import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import l from './logger';
import * as OpenApiValidator from 'express-openapi-validator';
import errorHandler from '../api/middlewares/error.handler'


import mongo from "./mongo";


const app = new Express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    const apiSpec = path.join(__dirname, 'api.yml');
    const validateResponses = !!(
      process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION &&
      process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
    );
  
    // ✅ CORS middleware should be here before everything else
    app.use(cors());
  
    // ✅ Preflight OPTIONS requests
    app.options('*', cors());
  
    // Then your other middlewares:
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
  
    app.use(Express.static(`${root}/public`));
  
    app.use(process.env.OPENAPI_SPEC || '/spec', Express.static(apiSpec));
  
    app.use(
      OpenApiValidator.middleware({
        apiSpec,
        validateResponses,
        ignorePaths: /.*\/spec(\/|$)/,
      })
    );
  }
  

  router(routes) {

    routes(app)
    app.use(errorHandler)
    return this;

  }

  listen(port = process.env.PORT) {
    const welcome = p => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV ||
          'development'} @: ${os.hostname()} on port: ${p}}`
      );

  
    mongo().then(() => {
      l.info("Database Loaded!");
      http.createServer(app).listen(port, welcome(port));
    });
  

    return app;
  }
}
*/
import express from 'express';
import cors from 'cors';
import * as path from 'path';
import * as http from 'http';
import * as os from 'os';
import l from './logger';
import * as OpenApiValidator from 'express-openapi-validator';
import errorHandler from '../api/middlewares/error.handler'
import mongo from "./mongo";

export default class ExpressServer {
  constructor() {
    this.app = express();
    const root = path.normalize(`${__dirname}/../..`);
    const apiSpec = path.join(__dirname, 'api.yml');
    const validateResponses = !!(
      process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION &&
      process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
    );

    this.app.use(cors());
    this.app.options('*', cors());

    // Use express built-in JSON parser
    this.app.use(express.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    this.app.use(express.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
    this.app.use(express.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));

    this.app.use(express.static(`${root}/public`));
    this.app.use(process.env.OPENAPI_SPEC || '/spec', express.static(apiSpec));

    this.app.use(
      OpenApiValidator.middleware({
        apiSpec,
        validateResponses,
        ignorePaths: /.*\/spec(\/|$)/,
      })
    );
  }

  router(routes) {
    routes(this.app);
    this.app.use(errorHandler);
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = p => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV ||
          'development'} @: ${os.hostname()} on port: ${p}`
      );

    mongo().then(() => {
      l.info("Database Loaded!");
      http.createServer(this.app).listen(port, welcome(port));
    });

    return this.app;
  }
}
