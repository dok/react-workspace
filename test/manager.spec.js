import {expect} from 'chai';
import React from 'react';

import Manager from '../src/manager';

describe('manager', () => {
  it('should split a pane horizontally at root', () => {
    const state = Manager.split({}, '', 'x');
    const expected = {
      axis: 'x',
      children: [
        {
          size: 50
        },
        {
          size: 50
        }
      ]
    };
    expect(state).to.eql(expected);
  });

  it('should split a pane horizontally at root with existing items', () => {
    const before = {
      axis: 'x',
      children: [
        {
          size: 50,
          tabs: [{}]
        },
        {
          size: 50,
          tabs: [{
            name: 'configs'
          }]
        }
      ]
    };
    const state = Manager.split(before, '', 'x', 3);
    const expected = {
      axis: 'x',
      children: [
        {
          size: 33.33,
          tabs: [{}]
        },
        {
          size: 33.33,
          tabs: [{
            name: 'configs'
          }]
        },
        {
          size: 33.33
        }
      ]
    };
    expect(state).to.eql(expected);
  });

  it('should throw an error if trying to split on both axis', () => {
    const before = {
      axis: 'x',
      children: [
        {
          size: 50,
          tabs: [{}]
        },
        {
          size: 50,
          tabs: [{
            name: 'configs'
          }]
        }
      ]
    };
    const fn = Manager.split.bind(Manager, before, '', 'y', 3);
    expect(fn).to.throw(Error);
  });

  it('should throw an error if pane found via path doesn\'t exist', () => {
    const before = {};
    const fn = Manager.split.bind(Manager, before, 'children[0]', 'y', 3);
    expect(fn).to.throw(Error);
  });

  it('should throw an error if max depth is reached', () => {
    const before = {
      axis: 'x',
      children: [
        {
          axis: 'y',
          children: [
            {
              axis: 'x',
              children: [
              ]
            }
          ]
        }
      ]
    };
    const fn = Manager.split.bind(Manager, before, 'x[0].y[0].x[0].y[0]', 'y', 2);
    expect(fn).to.throw(Error);
  });

  it('should split in a nested path', () => {
    const before = {
      axis: 'x',
      children: [
        {
          size: 33
        },
        {
          size: 33
        },
        {
          size: 33
        },
      ]
    };
    const expected = {
      axis: 'x',
      children: [
        {
          size: 33,
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
          size: 33
        },
        {
          size: 33
        },
      ]
    };
    const after = Manager.split(before, 'children[0]', 'y', 2);
    expect(after).to.eql(expected);
  });

  it('should build a tree', () => {
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
    };

    const tabs = {
      'children[0].children[0]': ['green', 'red'],
      'children[0].children[1]': 'green',
      'children[1]': 'yellow'
    };

    const tree = Manager.buildTree(root, components, tabs);
    expect(tree).to.exist;
    // console.log(JSON.stringify(tree, null, 2));

  })

  it('should move a tab item', () => {
    const tabs = {
      'children[0].children[0]': ['green', 'red'],
      'children[0].children[1]': 'blue',
      'children[1]': ['yellow', 'red']
    }
    const expected = {
      'children[0].children[0]': ['red'],
      'children[0].children[1]': 'blue',
      'children[1]': ['yellow', 'red', 'green']
    }

    const after = Manager.moveTab(tabs, 'children[0].children[0]', 0, 'children[1]');
    expect(after).to.eql(expected);
  });

});