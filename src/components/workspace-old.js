import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Manager from '../manager';
import { ResizableBox } from 'react-resizable';
import _ from 'lodash';
import Draggable from 'react-draggable';

import '../styles/main.scss';


class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
  }

  split(path, axis, multiplier) {
    const newRoot = Manager.split(this.state.root, path, axis, multiplier);
    this.setState({
      root: newRoot
    });
  }

  // {
  //   x: [
  //     {
  //       size: 50
  //     },
  //     {
  //       size: 50
  //     }
  //   ]
  // };

  handleStart(axis, path, event) {
    // this.state.root
    console.log(event);
  }
  handleDrag(axis, path, event) {
    console.log(axis, path, event);
    var previous = event.target.previousSibling;
    var next = event.target.nextSibling;

    var parent = event.target.parentNode;
    var parentHeight = parent.scrollHeight;
    var children = _.get(this.state.root, `${path}.children`);

    if(axis) {

    }
  }
  handleStop(axis, path, event) {
    console.log(event);
  }

  renderDivider(axis, path) {
    return (
      <Draggable
        axis={axis}
        handle=".handle"
        zIndex={100}
        onStart={this.handleStart.bind(this, axis, path)}
        onDrag={this.handleDrag.bind(this, axis, path)}
        onStop={this.handleStop.bind(this, axis, path)}>
        <span className={`handle handle-axis-${axis}`}></span>
      </Draggable>
    );
  }

  renderNode(node={}, axis, path='') {
    let children;
    // console.log(path);

    if(node.children && node.children.length) {
      children = [];
      _.each(node.children, (childNode, index, collection) => {
        const axisForChildren = node.axis;
        const newPath = `${path}${path ? '.' : ''}children[${index}]`;
        children.push(this.renderNode(childNode, axisForChildren, newPath));
        if(index + 1 !== collection.length) {
          children.push(this.renderDivider(axisForChildren, path));
        }
      });
    } else {
      children = null;
    }

    let style;
    if(axis) {
      style = {
        height: axis === 'y' ? `${node.size}%` : '100%',
        width: axis === 'y' ? '100%' : `${node.size}%`
      };
    } else {
      style = {}
    }

    const instance = (
      <div className={`pane ${axis ? `pane-${axis}` : ''}`} style={style}>
        {children}
      </div>
    );

    return instance;
  }

  render() {
    const node = this.state.root;
    const axis = node.axis;
    const root = this.renderNode(node, axis);

    return (
      <div className="workspace">
        {root}
      </div>
    );
  }
}

Workspace.propTypes = {
  root: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired
};

export default Workspace;
