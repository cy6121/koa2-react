/**
 * Created by Raion on 2019/2/20.
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
  static fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ count: 2 });
      });
    });
  }
  render() {
    return (
      <div className="flex">
        Hello React!
        <div>
          count: {this.props.count}
          <button type="button" onClick={this.props.changeCount}>增加</button>
        </div>
        <Link to="/404">notFound</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.count,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeCount: () => {
      dispatch({ type: 'INCREASE' });
    },
  };
}

Home.propTypes = {
  count: propTypes.number,
  changeCount: propTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
