/* @flow */
import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

type Props = {
  handleForm: (inputText:string, nextPage: ?boolean) => void,
};

class SearchForm extends React.Component<Props>  {
  input: ?HTMLInputElement

  handleForm = (e: {preventDefault: ()=>void})=> {
    e.preventDefault();
    if (this.input) {
      this.props.handleForm(this.input.value)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleForm} className="search__form">
        <input className="search__input" placeholder="Search" type='text' ref={ref => { this.input = ref }} />
        <button type="submit" className="no-button search__submit">
          <FontAwesomeIcon icon="search"
                           className="search__icon"
          />
        </button>
      </form>
    )
  }
}

export default SearchForm