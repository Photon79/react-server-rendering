import React, { createClass } from 'react';
import ReactDom, { findDOMNode, unmountComponentAtNode } from 'react-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Winterfell from 'winterfell';
import demoSchema from './demo-schema';

let FormBuilder = createClass({
  getInitialState() {
    return {
      schema: demoSchema
    };
  },

  componentDidMount() {
    const formId = this.props.formId || this.props.params.formId;
    //TODO: Get form config from server
  },

  getQuestionAnswers() {
    return {};
  },

  onSubmit(payload) {
    if (this.props.sendCloseMessage) {
      this.props.sendCloseMessage('success', payload)
    }
    else {
      const formId = this.props.formId || this.props.params.formId;
      this.props.fillForm(payload);
      this.forceUpdate();
      this.props.router.push(`/form/${formId}/complete`);
    }
  },

  render() {
    return <Winterfell
      {...this.state}
      ref="formBuilder"
      onSubmit={this.onSubmit}
      disableSubmit={true}
      questionAnswers={this.getQuestionAnswers()} />
  }
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    fillForm(payload) {
      dispatch({
        type: 'fill_form',
        data: payload
      })
    }
  }
}

FormBuilder = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormBuilder);

export default withRouter(FormBuilder);
