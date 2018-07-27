/* @flow */
import * as React from 'react';
import SearchForm from './SearchForm';
import * as actions from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

type Props = {
  searchField: string,
  nextPage: null | string,
  searchFieldFocused: boolean,
  actions: {
    search: (inputText: string, nextPage: ?string) => void,
    setSearchFieldFocused: (value: boolean) => void,
    setSearchField: (value: string) => void,
    clearSearch: () => void
  }
};

class SearchFormContainer extends React.Component<Props> {
  handleForm = () => {
    const {
      searchField,
      actions: { search }
    } = this.props;
    search(searchField, null);
  };

  render() {
    const { searchField, searchFieldFocused, actions } = this.props;
    return (
      <SearchForm
        handleForm={this.handleForm}
        onChange={actions.setSearchField}
        focused={searchFieldFocused}
        inputText={searchField}
        toggleFocus={actions.setSearchFieldFocused}
        clear={actions.clearSearch}
      />
    );
  }
}

export default connect(
  state => ({
    searchFieldFocused: state.playlist.searchFieldFocused,
    searchField: state.playlist.searchField,
    nextPage: state.playlist.nextPage
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(SearchFormContainer);
