import React from 'react';

/**
 * List Item
 */
const ListItem = ({ url, title }) => (
  <div className="list-row">
    <a href={ url }>{ title }</a>
  </div>
);

export default ListItem;
