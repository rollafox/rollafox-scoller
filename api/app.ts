'use strict';
import 'reflect-metadata';
import 'zone.js/dist/zone-node';

import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import errorHandler = require('errorhandler');
import * as express from 'express';
import mcache = require('memory-cache');
import methodOverride = require('method-override');
import * as logger from 'morgan';
import { join } from 'path';

import { IndexRoute } from './routes';
import { ErrorRoute } from './routes/error';

const DIST_FOLDER = join(process.cwd(), 'dist');
const ERROR_PAGE_FOLDER = join(DIST_FOLDER, 'browser', 'assets', 'static', 'error-pages');
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist/server/main.bundle');

// Express Engine
// Import module map for lazy loading

/**
 * The server.
 *
 * @class Server
 */
class App {

    public express: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     */
    public static bootstrap(): App {
        return new App();
    }

    public cache = (duration) => {
        return (req, res, next) => {
            const key = '__express__' + req.originalUrl || req.url,
                cachedBody = mcache.get(key);

            if (cachedBody) {
                res.send(cachedBody);
                return;
            } else {
                res.sendResponse = res.send;
                res.send = (body) => {
                    mcache.put(key, body, duration * 1000);
                    res.sendResponse(body);
                };
                next();
            }
        };
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        // create express application
        this.express = express();

        // configure application
        this.config();

        // configure routes
        this.routes();
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     * @return void
     */
    private config() {

        enableProdMode();

        this.express.set('view engine', 'html');
        this.express.set('views', 'src');

        // our custom "verbose errors" setting
        // which we can use in the templates
        // via settings['verbose errors']
        this.express.enable('verbose errors');

        // disable them in production
        // use $ NODE_ENV=production node examples/error-pages
        if ('production' === process.env.NODE_ENV) { this.express.disable('verbose errors'); }
        // mount logger
        this.express.use(logger('dev'));

        // Middleware for CORS
        this.express.use(cors());

        // mount json form parser
        this.express.use(bodyParser.json());

        // mount query string parser
        this.express.use(bodyParser.urlencoded({ extended: true }));

        this.express.engine('html', ngExpressEngine({
            bootstrap: AppServerModuleNgFactory,
            providers: [
                provideModuleMap(LAZY_MODULE_MAP)
            ]
        }));
        // use cookie parser middleware
        // this.express.use(cookieParser("SECRET_GOES_HERE"));

        // use override middlware
        this.express.use(methodOverride());

    }

    /**
     * Configure routes
     *
     * @class Server
     * @method routes
     * @return void
     */
    private routes() {
        let router: express.Router;
        router = express.Router();

        this.express.get('*.*', this.cache(10), express.static(join(DIST_FOLDER, 'browser')));

        this.express.get('/*', this.cache(10), (req, res) => {
            console.log(`GET: ${req.originalUrl}`);
            res.render(join(DIST_FOLDER, 'browser', 'index'), {
                req: req,
                res: res
            });
            console.log(`GET: ${req.originalUrl}`);
        });

        // IndexRoute
        IndexRoute.create(router);

        // ErrorRoute
        ErrorRoute.create(router);

        // use router middleware
        this.express.use(router);

        // catch errors
        this.errorHandle();
    }

    /**
     * Configure error handling on routes
     *
     * @class Server
     * @method errorHandle
     * @return void
     */
    private errorHandle() {
        // error handling
        this.express.use(errorHandler());

        this.express.use(function (req, res, next) {
            res.status(404);

            res.format({
                html: function () {
                    res.sendFile(join(ERROR_PAGE_FOLDER, '404.html'));
                },
                json: function () {
                    res.json({ error: 'Not found' });
                },
                default: function () {
                    res.type('txt').send('Not found');
                }
            });
        });

        this.express.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.format({
                html: function () {
                    res.sendFile(join(ERROR_PAGE_FOLDER, '500.html'));
                },
                json: function () {
                    res.json({ error: err });
                },
                default: function () {
                    res.type('txt').send('Internal Server Error');
                }
            });
        });

    }

}

export default App.bootstrap().express;
