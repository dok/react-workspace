import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Manager from '../manager';
import { ResizableBox } from 'react-resizable';
import _ from 'lodash';
import Draggable from 'react-draggable';
import SplitPane from 'react-split-pane';

import { Tab, Tabs, TabPanel } from 'react-tabs';
// import { connect } from 'react-redux';

import { dragSource, dragTarget } from '../utils';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import DragSpan from './DragSpan';
import TabList from './TabList';

import '../styles/main.scss';

// @connect(mapStateToProps, mapDispatchToProps)
@DragDropContext(HTML5Backend)
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
  }

  renderTabs(components, path) {
    const tabs = this.state.tabs;
    const tabHeaders = _.map(components, (component, index) => {
      const tabName = tabs[path][index];
      // const componentPath = `${path}[${index}]`;
      return (
        <Tab>
          <DragSpan path={path} index={index}>
            {tabName}
          </DragSpan>
        </Tab>
      );
    });
    const tabPanels = _.map(components, (component, index) => {
      return (
        <TabPanel>
          {component}
        </TabPanel>
      );
    });
    return (
      <Tabs>
        <TabList path={path} move={this.move.bind(this)} tabs={tabs}>
          {tabHeaders}
        </TabList>
        {tabPanels}
      </Tabs>
    );
  }

  renderNode(node, path='') {
    if(_.isArray(node.component)) {
      return this.renderTabs(node.component, path);
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
        return this.renderNode(child, childPath);
      });
    }

    const size = node.size ? `${node.size}%` : 200;

    return (
      <SplitPane split={split} minSize={100} defaultSize={size}>
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
  components: PropTypes.object.isRequired
};

export default Workspace;