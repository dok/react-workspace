import React, { Component } from 'react';
import Workspace from 'react-pane';
import '../styles/main.scss';

export default class App extends Component {
  render() {

    const root = {
      axis: 'x',
      children: [
        {
          size: 50,
          axis: 'y',
          children: [
            {
              size: 50
            },
            {
              size: 50
            }
          ]
        },
        {
          size: 50
        }
      ]
    };

    const components = {
      green: (
        <div style={{background: 'green', width: '100%', height: '100%'}}/>
      ),
      red: (
        <div style={{background: 'red', width: '100%', height: '100%'}}/>
      ),
      yellow: (
        <div style={{background: 'yellow', width: '100%', height: '100%'}}/>
      ),
      blue: (
        <div style={{background: 'blue', width: '100%', height: '100%'}}/>
      ),
    };

    const tabs = {
      'children[0].children[0]': ['green', 'red'],
      'children[0].children[1]': 'blue',
      'children[1]': ['yellow', 'red']
    }

    return (
      <div>
        <Workspace root={root} tabs={tabs} components={components}/>
      </div>
    );
  }
}
