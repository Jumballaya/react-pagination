import React from 'react';
import ListItem from './ListItem';
import './List.css';

/**
 * Hacker News List Component
 *
 */
const List = ({ list, page, onPaginatedSearch, isLoading }) => (
  <div className="list">
    { list.map(item => <ListItem key={ item.objectID } { ...item } /> ) }
  </div>
);

export default List;
