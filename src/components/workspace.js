import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Manager from '../manager';
import { ResizableBox } from 'react-resizable';
import _ from 'lodash';
import Draggable from 'react-draggable';
import SplitPane from 'react-split-pane';

import { Tab, Tabs } from 'react-tabs';

import { dragSource, dragTarget } from '../utils';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import DragSpan from './DragSpan';
import TabList from './TabList';
import TabPanel from './TabPanel';

import '../../styles/main.scss';

class Events {
  constructor() {
    this.listeners = {};
  }

  on(key, fn) {
    if(this.listeners[key]) {
      this.listeners[key].push(fn);
    } else {
      this.listeners[key] = [fn];
    }
  }

  trigger(key) {
    _.each(this.listeners[key], (fn) => {
      fn();
    });
  }
}

@DragDropContext(HTML5Backend)
class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
    this.pubsub = new Events();
  }

  split(path, axis, multiplier) {
    const newRoot = Manager.split(this.state.root, path, axis, multiplier);
    this.setState({
      root: newRoot
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
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

  // const tabs = {
  //   'children[0].children[0]': ['green', 'red'],
  //   'children[0].children[1]': 'blue',
  //   'children[1]': ['yellow', 'red']
  // }

  move(from, fromIndex, to, toIndex) {
    const newTabs = Manager.moveTab(this.state.tabs, from, fromIndex, to, toIndex);
    this.setState({
      tabs: newTabs
    });

    if(_.isFunction(this.props.onChange)) {
      this.props.onChange.call(this, this.state.root, newTabs);
    }

  }

  onResize() {
    this.pubsub.trigger('resize');
  }

  renderTabs(components, path, index) {
    const tabs = this.state.tabs;
    const tabHeaders = _.map(components, (component, index) => {
      const tabName = tabs[path][index];
      // const componentPath = `${path}[${index}]`;
      return (
        <Tab key={index}>
          <DragSpan path={path} index={index}>
            {tabName}
          </DragSpan>
        </Tab>
      );
    });
    const tabPanels = _.map(components, (component, index) => {
      return (
        <TabPanel key={index} pubsub={this.pubsub}>
          {component}
        </TabPanel>
      );
    });
    return (
      <Tabs>
        <TabList path={path} 
                 move={this.move.bind(this)} 
                 tabs={tabs}>
          {tabHeaders}
        </TabList>
        {tabPanels}
      </Tabs>
    );
  }

  renderNode(node, path='', index=0) {
    if(_.isArray(node.component)) {
      return this.renderTabs(node.component, path, index);
    } else if(node.component) {
      return node.component;
    }

    let children = null;
    const split = node.axis === 'x' ? 'vertical' : 'horizontal';
    if(node.children) {
      children = _.map(node.children, (child, index) => {
        let childPath;
        if(path === '') {
          childPath = `children[${index}]`;
        } else {
          childPath = `${path}.children[${index}]`;
        }
        return this.renderNode(child, childPath, index);
      });
    }

    const size = node.size ? `${node.size}%` : 200;

    return (
      <SplitPane key={`splitpane-${path}-${index}`} split={split} minSize={100} defaultSize={size}>
        {children}
      </SplitPane>
    );
  }

  render() {
    const node = this.state.root;
    const axis = node.axis;

    // const root = this.renderNode(node, axis);
    // const newRoot = Manager.split(this.state.root, path, axis, multiplier);

    const tree = Manager.buildTree(node,this.state.components, this.state.tabs);
    const root = this.renderNode(tree);

    return (
      <div className="workspace">
        {root}
      </div>
    );
  }

}

Workspace.propTypes = {
  root: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  onChange: PropTypes.func
};

export default Workspace;