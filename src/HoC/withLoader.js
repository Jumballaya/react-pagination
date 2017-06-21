import React from 'react';

const withLoader = conditionFn => Component => props => (
  <div>
    <Component { ...props } />
    <div className="interactions">
      { conditionFn(props) && <span>Loading...</span> }
    </div>
  </div>
);

export default withLoader;
