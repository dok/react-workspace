import React, { Component } from 'react';
import { TabList } from 'react-tabs';
import { mapDispatchToProps, mapStateToProps, dragSource, dragTarget } from '../utils';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

@DropTarget('TAB', dragTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
export default class Comp extends Component {
  render() {
    const { connectDropTarget, path } = this.props;

    return connectDropTarget(
      <div>
        <TabList>
          {this.props.children}
        </TabList>
      </div>
    )
  }
}