import React, { Component } from 'react';
import { compose } from 'recompose';
import List from '../List/List';
import withLoader from '../../HoC/withLoader';
import withPagination from '../../HoC/withPagination';
import withInfiniteScroll from '../../HoC/withInfiniteScroll';
import './NewsSearch.css';


/**
 * Apply Update Result
 *
 * @description Update state while preserving the hits
 * @param {Object} result, the results of the API call
 * @return {Function} returns a callback function that can be fed into this.setState()
 */
const applyUpdateResult = result => prevState => ({
  hits: [...prevState.hits, ...result.hits],
  page: result.page,
  isLoading: false,
  isError: false,
});

/**
 * Apply Set Result
 *
 * @description Update the state and reset the hits
 * @param {Object} result, the results of the API call
 * @return {Function} returns a callback function that can be fed into this.setState()
 */
const applySetResult = result => prevState => ({
  hits: result.hits,
  page: result.page,
  isLoading: false,
  isError: false,
});

/**
 * Apply Set Error
 *
 * @description Set error to true and remove loading state
 */
const applySetError = prevState => ({
  isError: true,
  isLoading: false,
});

/**
 * Get Hacker News URL
 *
 * @description Returns the Hacker News search URL
 * @param {String} value, search query
 * @param {String|Number} page to fetch
 * @return {String} url to fetch
 */
const getHackerNewsUrl = (value, page) =>
  `https://hn.algolia.com/api/v1/search?query=${value}&page=${page}&hitsPerPage=100`;


/**
 * Composed List with loader and pagination
 */
const paginationCondition = props =>
  props.page !== null && !props.isLoading && props.isError;

const infiniteScrollCondition = props => {
  let { list, isLoading, isError, onPaginatedSearch } = this.props;
  let windowHeight = window.innerHeight;
  let scrollPosY = window.scrollY;
  let bodyHeight = document.body.offsetHeight;
  if (
    (windowHeight + scrollPosY) >= (bodyHeight - 500)
    && list.length
    && !isLoading
    && !isError
  ) onPaginatedSearch();
}

const loaderCondition = props =>
  props.isLoading;

const AdvancedList = compose(
  withPagination(paginationCondition),
  withInfiniteScroll(infiniteScrollCondition),
  withLoader(loaderCondition)
)(List);

/**
 * Hacker News Search and Pagination
 *
 *
 */
class NewsSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      page: null,
      isLoading: false,
      isError: false,
    };
  }

  onSetResult = (result, page) =>
    page === 0
    ? this.setState(applySetResult(result))
    : this.setState(applyUpdateResult(result));

  fetchStories = (value, page) => {
    this.setState({ isLoading: true });
    fetch(getHackerNewsUrl(value, page))
      .then(res => res.json())
      .then(res => this.onSetResult(res, page))
      .catch(this.onSetError);
  }

  onInitialSearch = e => {
    e.preventDefault();
    const { value } = this.input;
    if (value === '') return;
    this.fetchStories(value, 0);
  };

  onPaginatedSearch = e =>
    this.fetchStories(this.input.value, this.state.page + 1);

  onSetError = () =>
    this.setState(applySetError);

  render() {
    return (
      <div className="page">
        <div className="interactions">
          <form type="submit" onSubmit={ this.onInitialSearch }>
            <input type="text" ref={ input => this.input = input } />
            <button type="submit">Search</button>
          </form>
        </div>
        <div style={ { maxWidth: '640px', margin: '0 auto' } }>
          <AdvancedList
            list={ this.state.hits }
            page={ this.state.page }
            isLoading={ this.state.isLoading }
            onPaginatedSearch={ this.onPaginatedSearch }
            isError={ this.state.isError }
          />
        </div>
      </div>
    );
  }
}

export default NewsSearch;
