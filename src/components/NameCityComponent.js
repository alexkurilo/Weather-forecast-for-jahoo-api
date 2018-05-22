import React, { Component } from 'react';
import {connect} from 'react-redux';

const NameCityComponent = ({resultLinkItem}) => {
    console.log(resultLinkItem);

    if ((Object.keys(resultLinkItem).length !== 0)) {
        return (
            <div></div>
        )
    }else{
        return (
            <div></div>
        )
    }
};

export default connect(
    (state ) => ({
        resultLinkItem: state.resultLinkItem
    }),

    dispatch => ({

    })
)(NameCityComponent);