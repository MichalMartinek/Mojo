/* @flow */
import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import type {Video} from "./types";
import SearchResult from "./SearchResult";

type Props = {
  result: null | Array<Video>,
  itemClick: (id:Video) => any,
  searchHandle: (inputText:string, nextPage: ?boolean) => void,
  hasMore: boolean,
};

class Search extends React.Component<Props>  {
  input: ?HTMLInputElement

  handleForm = (e: {preventDefault: ()=>void})=> {
    e.preventDefault();
    if (this.input) {
      this.props.searchHandle(this.input.value)
    }
  }

  render() {
    const {result, itemClick, hasMore } = this.props
    return (
      <div className="search">
        <form onSubmit={this.handleForm} className="search__form">
          <input className="search__input" placeholder="Search" type='text' ref={ref => { this.input = ref }} />
          <button type="submit" className="no-button search__submit">
            <FontAwesomeIcon icon="search"
                             className="search__icon"
            />
          </button>
        </form>
        <div className="search__resultContainer">
          {
            result ?
              <SearchResult
                itemClick={itemClick}
                videos={result}
                hasMore={hasMore}
                loadMore={()=>this.props.searchHandle('', true)}
              />
              :
              <div>
                Use search to get videos
              </div>
          }
        </div>
      </div>
    )
  }
}

export default Search