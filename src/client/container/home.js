import './home.pcss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="flex">
        <span role="none" onClick={() => console.log('home')}>Home</span>
        <div>
          <Link to="/about" style={{ textDecoration: 'none' }}>About</Link>
        </div>
      </div>
    );
  }
}

export default Home;
