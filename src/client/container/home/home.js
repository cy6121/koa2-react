/**
 * Created by Raion on 2019/2/20.
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  state = {
    count: 1,
  };
  handleCount = () => {
    this.setState({ count: this.state.count + 1 });
  };
  render() {
    return (
      <div>
        Hello React!
        <div>
          count: {this.state.count}
          <button type="button" onClick={this.handleCount}>增加</button>
        </div>
        <Link to="/notFound">notFound</Link>
      </div>
    );
  }
}
