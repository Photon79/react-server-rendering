import React from 'react';
import { connect } from 'react-redux';
import Highlight from 'react-hljs';

let CompletePage = React.createClass({
  getInitialState() {
    return {
      data: {}
    }
  },

  render() {
    return <div className='alert alert-success'>
      Thank you for filling out the form
      <pre>
        <Highlight className='json'>
          {JSON.stringify(this.props.data, null, 4)}
        </Highlight>
      </pre>
    </div>;
  }
})

function mapStateToProps(state) {
  return {
    data: state.payload
  };
}

export default connect(
  mapStateToProps
)(CompletePage);
