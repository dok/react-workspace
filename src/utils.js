import { findDOMNode } from 'react-dom';

const utils = {
  mapStateToProps: (state) => {
    return {
      // appState: state.get('app')
    };
  },
  mapDispatchToProps: (dispatch) => {
    // import * as AppActions from '../actions/app';
    // const AppActions = require('../actions/app');

    return bindActionCreators(null, dispatch);
  },
  dragSource: {
    beginDrag(props) {
      console.log('props: ', props);
      return props;
    }
  },
  dragTarget: {
    hover: (props, monitor, component) => {
    },
    drop: (props, monitor, component) => {
      const item = monitor.getItem();

      if(!item) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = props.index;
      // Don't replace items with themselves
      // if (dragIndex === hoverIndex) {
      //   return;
      // }

      // Determine rectangle on screen
      const node = findDOMNode(component);
      component.props.move(item.path, item.index, props.path);
      return;

      // const hoverBoundingRect = node.getBoundingClientRect();

      // // Get vertical middle
      // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // // Determine mouse position
      // const clientOffset = monitor.getClientOffset();

      // // Get pixels to the top
      // const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // // Only perform the move when the mouse has crossed half of the items height
      // // When dragging downwards, only move when the cursor is below 50%
      // // When dragging upwards, only move when the cursor is above 50%

      // // Dragging downwards
      // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      //   return;
      // }

      // // Dragging upwards
      // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      //   return;
      // }


      // console.log('moviddng: ', dragIndex, hoverIndex);
      // const ary = props.path.split(',');
      // props.move_item(ary.slice(0,ary.length - 1).join(','), dragIndex, hoverIndex);
    }
  }

} 

export default utils;