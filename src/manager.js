import _ from 'lodash';


export const MAX_DEPTH = 3;
export const MSG = {
  IMPOSSIBLE_SPLIT: 'CANNOT SPLIT AT THIS PATH WITH AXIS',
  MAX_DEPTH: `CANNOT SPLIT BEYOND ${MAX_DEPTH} LAYERS`,
  INVALID_PATH: 'PANE VIA PATH NOT FOUND'
};

class Manager {
  constructor() {
  }

  /**
   * Checks if current pane can be split in that axis
   * @return {Boolean} Returns true or false
   */
  static validateSplit(state, path, axis, multiplier) {
    const depth = ''.split('.').length;
    let errors = [];

    if(depth > MAX_DEPTH) {
      errors.push(new Error(MSG.MAX_DEPTH));
    }

    let root = _.cloneDeep(state);
    let pane;
    if(path === '') {
      pane = root;
    } else {
      pane = _.get(root, path);
    }

    if(!pane) {
      errors.push(new Error(MSG.NO_SUCH_PATH));
      return errors;
    }

    // if clean slate 
    if(!pane.children) {
      return errors;
    }

    if(pane.axis !== axis) {
      errors.push(new Error(MSG.IMPOSSIBLE_SPLIT));
    }

    return errors;
  }

  /**
   * Creates a new state with the manipulation 
   * @param  {Object} state [description]
   * @param  {String} path  e.g. 'x[0].y[1]'
   * @param  {String} axis  'x' or 'y'
   * @param  {Number} muliplier  How many times you want to split by
   * @return {Object}       Returns a new state 
   */
  static split(state={}, path, axis, multiplier=2) {
    // needs to check if the current path can accept a split in the axis
    const errors = this.validateSplit(state, path, axis, multiplier);
    if(errors.length) {
      throw new Error(_.map(errors, _.identity));
    } 

    let root = _.cloneDeep(state);
    let currentPane;
    if(path === '') {
      currentPane = root;
    } else {
      currentPane = _.get(root, path);
    }

    const edited = this.splitPane(currentPane, axis, multiplier);
    return this.setPane(root, path, edited);
  }

  static setPane(root, path, pane) {
    if(path === '') {
      return pane;
    } else {
      return _.set(root, path, pane);
    }
  }


  /**
   * Split the panes at current position with axis
   */
  static splitPane(pane, axis, multiplier) {
    const divider = _.round(100 / multiplier, 2);
    pane.axis = axis;

    // if pane doesn't have an existing setup
    if(!pane.children) {
      pane.children = []
      for(var i = 0; i < multiplier; i++) {
        pane.children.push({
          size: divider
        });
      }
    } else {
      _.times(multiplier, (index) => {
        if(pane.children[index]) {
          pane.children[index].size = divider;
        } else {
          pane.children.push({
            size: divider
          });
        }
      })
    }

    return pane;
  }

  static moveTab(tabs, from, fromIndex, to, toIndex) {
    // const tabs = {
    //   'children[0].children[0]': ['green', 'red'],
    //   'children[0].children[1]': 'blue',
    //   'children[1]': ['yellow', 'red']
    // }
    if(!toIndex) {
      toIndex = tabs[to].length;
    }

    let newTabs = _.cloneDeep(tabs);
    const name = newTabs[from][fromIndex];
    newTabs[from].splice(fromIndex, 1);
    newTabs[to].splice(toIndex, 0, name);

    return newTabs;
  }

  static buildTree(root, components, tabs) {
    function walk(node, path='') {
      if(tabs[path]) {
        if(_.isArray(tabs[path])) {
          node.component = _.map(tabs[path], 
                                (componentName) => components[componentName]);
        } else {
          node.component = components[tabs[path]];
        }
      }

      if(node.children) {
        node.children = _.map(node.children, (child, index) => {
          let childPath;
          if(path === '') {
            childPath = `children[${index}]`;
          } else {
            childPath = `${path}.children[${index}]`;
          }
          return walk(child, childPath);
        })
      }

      return node;
    }

    return walk(_.cloneDeep(root));
  }
}

export default Manager;