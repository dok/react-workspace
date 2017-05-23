import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { TabPanel } from 'react-tabs';
import _ from 'lodash';
import elementResizeEvent, { unbind } from '../lib/element-resize-event';
import visibleArea from '../visibleArea';

const DEFAULT_CLASS = 'react-tabs__tab-panel';

// console.log(TabPanel.propTypes);

class Comp extends TabPanel {
  constructor(props) {
    super(props);
  }

  onResize() {
    if(this.mounted) {
      const node = ReactDOM.findDOMNode(this);
      const parent = node.parentNode.parentNode;
      const prev = parseInt(parent.style.height, 10);
      const {height} = visibleArea(parent);

      if(prev === height || height === 0) {
        return;
      }
      if(height) {
        node.style.height = `${height}px`;
      }
    }

  }

  componentDidMount() {
    if( typeof window !== 'undefined' ) {
      const fn = _.debounce(this.onResize.bind(this), 100);
      this.props.pubsub.on('resize', fn);
      // const elementResizeEvent = require('../lib/element-resize-event');
      const node = ReactDOM.findDOMNode(this);
      // elementResizeEvent(node, this.onResize.bind(this));
      elementResizeEvent(node, () => {
        this.props.pubsub.trigger('resize');
      });
    }
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
}

// Comp.propTypes = _.assign({
//   key: PropTypes.number
// }, TabPanel.propTypes);

export default Comp;
