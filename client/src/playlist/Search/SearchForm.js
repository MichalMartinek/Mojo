/* @flow */
import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

type Props = {
  inputText: string,
  focused: boolean,
  handleForm: () => void,
  onChange: (e: string) => void,
  toggleFocus: (e: boolean) => void,
  clear: () => void
};

class SearchForm extends React.Component<Props> {
  handleForm = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    this.props.handleForm();
  };
  handleInputChange = (event: { target: { value: string } }) => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { inputText, focused, toggleFocus, clear } = this.props;
    return (
      <form
        onSubmit={this.handleForm}
        className={`searchForm ${focused ? 'searchForm--focused' : ''}`}
      >
        <button
          type="submit"
          className="no-button searchForm__button"
          title="Search"
        >
          <FontAwesomeIcon icon="search" className="searchForm__icon" />
        </button>
        <input
          className="searchForm__input"
          placeholder="Search"
          value={inputText}
          onFocus={() => {
            toggleFocus(true);
          }}
          onBlur={() => {
            toggleFocus(false);
          }}
          onChange={this.handleInputChange}
        />
        {inputText.length > 0 && (
          <button
            className="no-button searchForm__button"
            title="Clear"
            onClick={clear}
          >
            <FontAwesomeIcon icon="times" className="searchForm__icon" />
          </button>
        )}
      </form>
    );
  }
}

export default SearchForm;
