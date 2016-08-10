import ObjectAssign from 'object-assign';
import express from 'express';
import path from 'path';
import process from 'process';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RouterContext as routerContext } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
const RouterContext = React.createFactory(routerContext);
const Provider = React.createFactory(ReduxProvider);

import routes from './src/routes.js';
import { configureStore } from './src/redux-store';

Object.assign = null;
Object.assign = ObjectAssign;

const app = express();
app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get(['/', '/form/:formId', '/form/:formId/complete'], (req, res) => {
  var initialState = {};
  const store = configureStore(initialState);

  match({routes: routes, location: req.url}, function(error, redirectLocation, renderProps) {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      res.send("<!DOCTYPE html>"+
        ReactDOMServer.renderToString(
          Provider({store: store}, RouterContext(renderProps))
        )
      );
    } else {
      res.status(404).send('Not found')
    }
  });
});

app.listen(app.get('port'), () => {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
