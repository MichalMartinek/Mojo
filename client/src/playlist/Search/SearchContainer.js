/* @flow */
import * as React from 'react';
import search from "youtube-search";
import type {Video} from "../types";
import Search from "./Search";
import * as constants from "../../constants";

type Props = {
  itemClick: (id:Video) => any
};

type State = {
  results: null | Array<Video>,
  nextPage: ?string,
}
class SearchContainer extends React.Component<Props, State>  {
  state = {
    results: null,
    nextPage: undefined,
  }
  handleSearch : (text: string, nextPage: ?boolean) => void = (text, nextPage) => {
    const opts = {
      maxResults: 10,
      key: constants.GOOGLE_API,
      type: 'video',
      pageToken: undefined,
    };

    if (nextPage) opts.pageToken = this.state.nextPage

    search(text, opts, (err, newPage, pageInfo) => {
      if(err) return console.log(err);
      const results = nextPage && this.state.results ? [...this.state.results, ...newPage] : newPage
      this.setState({results, nextPage: pageInfo.nextPageToken})
    });
  }

  render() {
    const { itemClick } = this.props
    const {results, nextPage} = this.state
    return (
      <Search
        handleSearch={this.handleSearch}
        hasMore={typeof nextPage === typeof ''}
        results={results}
        itemClick={itemClick}
      />
    )
  }
}

export default SearchContainer