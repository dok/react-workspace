import React, { Component } from 'react';
import Workspace from 'react-pane';
import '../styles/main.scss';

export default class App extends Component {
  render() {
    const root = {
      axis: 'x',
      children: [
        {
          axis: 'y',
          size: 50,
          children: [
            {
              axis: 'x',
              size: 70,
              children: [
                {
                  size: 30,
                  sidebar: true // sidebar
                },
                {
                  axis: 'y',
                  size: 70,
                  children: [
                    {
                      size: 40,
                      editor: true // editor
                    },
                    {
                      size: 60,
                      block: true // block
                    }
                  ]
                }
              ]
            },
            {
              size: 30,
              logs: true // logs
            }
          ]
        },
        {
          size: 50,
          browser: true // browser
        }
      ]
    };

    const components = {
      sidebar: (
        <div style={{background: 'green', width: '100%', height: '100%'}}/>
      ),
      editor: (
        <div style={{background: 'red', width: '100%', height: '100%'}}/>
      ),
      block: (
        <div style={{background: 'yellow', width: '100%', height: '100%'}}/>
      ),
      logs: (
        <div style={{background: 'blue', width: '100%', height: '100%'}}/>
      ),
      configs: (
        <div style={{background: 'orange', width: '100%', height: '100%'}}/>
      ),
      browser: (
        <div style={{background: 'gray', width: '100%', height: '100%'}}/>
      ),
    };

    const tabs = {
      'children[0].children[0].children[0]': ['sidebar'],
      'children[0].children[0].children[1].children[0]': ['editor'],
      'children[0].children[0].children[1].children[1]': ['block'],
      'children[0].children[1]': ['logs', 'configs'],
      'children[1]': ['browser'],
    };

    return (
      <div>
        <Workspace root={root} tabs={tabs} components={components}/>
      </div>
    );
  }
}
