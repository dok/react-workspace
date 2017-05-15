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
      node.style.height = null;
      const {height} = visibleArea(node);
      if(height) {
        node.style.height = `${height}px`;
      }

    }

  }

  componentDidMount() {
    if( typeof window !== 'undefined' ) {
      // const elementResizeEvent = require('../lib/element-resize-event');
      const node = ReactDOM.findDOMNode(this);
      elementResizeEvent(node, this.onResize.bind(this));
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
