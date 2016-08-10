import React from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';

let Index = React.createClass({
  render: function() {
    return <html>
      <head>
        <meta charSet="utf-8" />
        <title>React Server Tutorial</title>
        <link rel="stylesheet" href="/css/bootstrap.css" />
        <link rel="stylesheet" href="/css/base.css" />
        <link rel="stylesheet" href="/css/highlight.js/default.css" />
        <script dangerouslySetInnerHTML={{__html: this.props.initialState}} />
      </head>
      <body>
        <div id="content">
          <ul>
            <li><IndexLink to="/" activeStyle={{fontWeight: 'bold'}}>Main page</IndexLink></li>
            <li><Link to="/form/1234" activeStyle={{fontWeight: 'bold'}}>Show form</Link></li>
          </ul>

          {this.props.children}
        </div>

        <script src="/scripts/polyfill.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
        <script src="/scripts/bundle.js"></script>
      </body>
    </html>;
  }
});

const IndexState = (state) => {
  const stateJSON = JSON.stringify(state).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');

  return {
    initialState: "window.__INITIAL_STATE__ = " + stateJSON
  };
}

Index = connect(
  IndexState
)(Index)

export default Index;
