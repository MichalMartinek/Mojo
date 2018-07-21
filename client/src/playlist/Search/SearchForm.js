/* @flow */
import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

type Props = {
  handleForm: (inputText: string, nextPage: ?boolean) => void
};
type State = {
  inputText: string
};

class SearchForm extends React.Component<Props, State> {
  state = {
    inputText: ''
  };
  handleForm = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    this.props.handleForm(this.state.inputText);
  };
  handleInputChange = (event: { target: { value: string } }) => {
    this.setState({ inputText: event.target.value });
  };

  render() {
    const { inputText } = this.state;
    return (
      <form onSubmit={this.handleForm} className="search__form">
        <input
          className="search__input"
          placeholder="Search"
          value={inputText}
          onChange={this.handleInputChange}
        />
        <button type="submit" className="no-button search__submit">
          <FontAwesomeIcon icon="search" className="search__icon" />
        </button>
      </form>
    );
  }
}

export default SearchForm;
