import React from 'react';

const withPagination = conditionFn => Component => props => (
  <div>
    <Component { ...props } />
    {
      conditionFn(props) &&
      <div className="interactions">
        <div>
          Something Went Wrong...
        </div>
        <button
          type="button"
          onClick={ props.onPaginatedSearch }
        >
          Try Again
        </button>
      </div>
    }
  </div>
);

export default withPagination;
