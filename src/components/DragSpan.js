import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { mapDispatchToProps, mapStateToProps, dragSource, dragTarget } from '../utils';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

@DragSource('TAB', dragSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class Comp extends Component {
  render() {
    const { connectDragSource, connectDropTarget } = this.props;

    return connectDragSource(
      <span>
        {this.props.children}
      </span>
    )
  }
}