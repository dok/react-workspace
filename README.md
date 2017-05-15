react-workspace
=========================

A fusion between [react-tabs][react-tabs] and [react-split-pane][react-split-pane].

![apr-30-2017 19-29-47](https://cloud.githubusercontent.com/assets/1214868/25564006/da700b6c-2ddb-11e7-9ed2-2d4ecf2076ff.gif)


### How to use

```js
// A representation of the panel structure
const root = {
  axis: 'x',
  size: 50,
  children: [
    {
      size: 50,
      axis: 'y',
      children: [
        {},
        {}
      ]
    },
    {}
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
  blue: (
    <div style={{background: 'blue', width: '100%', height: '100%'}}/>
  ),
};

const tabs = {
  // keys are paths of root,
  // values are representations of tabs
  'children[0].children[0]': ['green', 'red'], // if it is an array, then it will be a tab
  'children[0].children[1]': 'blue', // if not, just render the component itself
  'children[1]': ['yellow', 'red']
}

const workspace = (
  <Workspace onChange={(newRoot, newTabs) => {}} root={root} tabs={tabs} components={components}/>
);

```


[react-split-pane]: https://github.com/tomkp/react-split-pane
[react-tabs]: https://github.com/reactjs/react-tabs
