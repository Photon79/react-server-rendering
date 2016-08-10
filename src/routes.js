import React from 'react';
import { Route } from 'react-router';

import CompletePage from './complete';
import FormBuilder from './form-builder';
import Index from './index';

var routes = (
  <Route path="/" component={Index}>
    <Route path="/form/:formId" component={FormBuilder} />
    <Route path="/form/:formId/complete" component={CompletePage} />
  </Route>
)

export default routes;
