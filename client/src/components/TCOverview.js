import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Icon } from 'react-fa';
import _ from 'lodash';

import { load_metadata, load_results, add_outcome, remove_outcome } from '../actions/reduxActions'
import TCResults from '../components/TCResults';
import TCSteps from '../components/TCSteps';
import OutcomeBadge from '../components/OutcomeBadge';


class TCOverview extends Component {

    componentDidMount() {
        this.props.dispatch(load_metadata({ tcid: this.props.tcid }))
        this.props.dispatch(load_results({ tcid: this.props.tcid }))
    }

    render() {
        if (this.props.metadata[this.props.tcid] === undefined ||
            this.props.results[this.props.tcid] === undefined)
            return (<div>Loading</div>);

        const metadata = this.props.metadata[this.props.tcid];
        const results = this.props.results[this.props.tcid];


        const resultsSummary = _(results).values().countBy().entries().value().map((entry) => {
            return entry.reduce((outcome, count) => {
                return (
                    <span>
                        <OutcomeBadge outcome={outcome}>{count.toString()}</OutcomeBadge>{' '}
                    </span>)
            });
        });

        return (
            <div className="testcase-summary">
                <div className="row">
                    <div className="col-6">
                        {metadata.name}
                    </div>
                    <div className="col-6 text-right">
                        {resultsSummary}
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => {
    const { metadata, results } = state

    return {
        metadata,
        results
    }
}

export default connect(mapStateToProps)(TCOverview);