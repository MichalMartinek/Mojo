/* @flow */
import * as React from 'react';
import type { Video } from '../types';
import SearchResult from './SearchResult';
import SearchForm from './SearchForm';

type Props = {
  results: null | Array<Video>,
  itemClick: (id: Video) => any,
  handleSearch: (inputText: string, nextPage: ?boolean) => void,
  hasMore: boolean
};

class Search extends React.Component<Props> {
  render() {
    const { itemClick, results, handleSearch, hasMore } = this.props;
    return (
      <div className="search">
        <SearchForm handleForm={handleSearch} />
        <div className="search__resultContainer">
          {results ? (
            <SearchResult
              itemClick={itemClick}
              videos={results}
              hasMore={hasMore}
              loadMore={() => handleSearch('', true)}
            />
          ) : (
            <div>Use search to get videos</div>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
