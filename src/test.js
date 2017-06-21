import React from 'react';

/**
 * First Level -> Return Component
 */
const SimpleComponent = (props) => (
  <div>
    { props.greeting }
  </div>
);
/*  <SimpleComponent greeting="Hello World" /> */

/**
 * Second Level -> Return function that builds the component above
 *
 * This will return a function that takes a Component and sets the greeting to Hello World if
 * the showComponent props is true.
 */
const makeComponentHelloWorld = Component => props => {
  if (props.showComponent) {
    return (<Component { ...props } greeting="Hello World" />);
  } else {
    return null;
  }
};
/* const HelloWorldSimpleComponent = makeComponentHelloWorld(SimpleComponent);

/**
 * Third Level -> Return a function that accepts a function that will be against the incoming props.
 * The returned function will return a functin that builds a component (as above). This allows us
 * to dynamically set the conditions to be tested for instead of relying on props.ShowComponent
 */
const curryMakeComponentHelloWorld = conditionFn => Component => props => {
  if (conditionFn(props)) {
    return (<Component { ...props } greeting="Hello World" />);
  } else {
    return null;
  }
};
/**
 * const HelloWorldSimpleComponentWhenUpIsDown =
 *    curryMakeComponentHelloWorld(props => props.up === 'down')(SimpleComponent);
 *
 */
