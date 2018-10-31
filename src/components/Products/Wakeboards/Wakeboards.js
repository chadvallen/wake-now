import React, { Component } from 'react';
import axios from 'axios';
import './Wakeboards.css';

export default class Wakeboards extends Component {
  constructor() {
    super();
    this.state = {
      wakeboards: []
    }
  }

  componentDidMount() {
    this.displayWakeboards()
  }

  displayWakeboards = () => {
    axios.get('/api/products/wakeboards').then(res => {
      this.setState({wakeboards: res.data})
    })
  }

  render() {
    let wakeboardList = this.state.wakeboards.map(item => {
      return (
        <div>
          <h3>{item.name}</h3>
          <img src={item.image_url} />
          <p>{item.description}</p>
        </div>
      )
    })
    return (
      <div>
        <h1>Wakeboards</h1>
        {wakeboardList}
      </div>
    )
  }
}
