import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Icon } from 'react-fa';

import { load_results, add_outcome, remove_outcome } from '../actions/reduxActions'
import TCResults from '../components/TCResults';
import TCSteps from '../components/TCSteps';


class TC extends Component {

  componentDidMount() {
    this.props.dispatch(load_results({ tcid: this.props.tcid }))
  }

  handleOutcome(outcome) {
    this.props.dispatch(add_outcome({ tcid: this.props.tcid, user: this.props.user, outcome: outcome }));
  }

  handleRemove() {
    this.props.dispatch(remove_outcome({ tcid: this.props.tcid, user: this.props.user }));
  }

  render() {
    if (this.props.metadata === undefined ||
      this.props.results === undefined)
      return (<div>Loading</div>);

    const { metadata, results } = this.props;

    const result_buttons = (this.props.user === "") ?
      (null) :
      (<div>
        <div className="h-result">Your result:</div>
        <button type="button" className="btn btn-sm btn-success" onClick={() => this.handleOutcome('PASSED')}>
          <Icon name="check" fixedWidth />
        </button>{' '}
        <button type="button" className="btn btn-sm btn-warning color-white" onClick={() => this.handleOutcome('WARNING')}>
          <Icon name="exclamation-triangle" fixedWidth />
        </button>{' '}
        <button type="button" className="btn btn-sm btn-danger" onClick={() => this.handleOutcome('FAILED')}>
          <Icon name="times" fixedWidth />
        </button>{' '}
        <button type="button" className="btn btn-sm btn-info" onClick={() => this.handleOutcome('INPROGRESS')}>
          <Icon name="spinner" fixedWidth />
        </button>{' '}
        <button type="button" className="btn btn-sm btn-dark" onClick={this.handleRemove.bind(this)}>
          <Icon name="trash" fixedWidth />
        </button>{' '}
      </div>)

    return (
      <div className="testcase">
        <div className="row h-testcase">
          <div className="col">
            <h2>{metadata.name}</h2>
          </div>
        </div>
        <div className="testcase-info">
          <div className="row description">
            <div className="col">{metadata.description}</div>
          </div>
          <br />
          <div className="row justify-content-start steps">
            <TCSteps steps={metadata.steps} title="Steps" />
            <TCSteps steps={metadata.expected} title="Expected" />
            <TCResults results={results} />
          </div>
          <br />

          {result_buttons}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { metadata, results, user } = state

  return {
    metadata: metadata[ownProps.tcid],
    results: results[ownProps.tcid],
    user
  }
}

export default connect(mapStateToProps)(TC);