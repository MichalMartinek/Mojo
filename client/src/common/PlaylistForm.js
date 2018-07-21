/* @flow */
import * as React from 'react';

type Props = {
  handleForm: (inputText: string, nextPage: ?boolean) => void
};
type State = {
  inputText: string,
  validText: boolean,
  initial: boolean
};

class PlaylistForm extends React.Component<Props, State> {
  state = {
    inputText: '',
    validText: true,
    initial: true
  };
  handleForm = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (this.state.initial) {
      this.setState({
        initial: false
      });
    }
    if (this.validate()) {
      this.props.handleForm(this.state.inputText);
    }
  };
  handleInputChange = (event: { target: { value: string } }) => {
    this.setState({ inputText: event.target.value });
    if (!this.state.initial) {
      this.validate();
    }
  };
  validate = (): boolean => {
    const validText = this.state.inputText.length > 2;
    this.setState({ validText });
    return validText;
  };

  render() {
    const { inputText, validText } = this.state;
    return (
      <form onSubmit={this.handleForm} className="playlistForm">
        <input
          className={`playlistForm__input ${
            !validText ? 'playlistForm__input--warning' : ''
          }`}
          placeholder="New playlist"
          value={inputText}
          onChange={this.handleInputChange}
        />
        <button type="submit" className="no-button playlistForm__submit">
          Add
        </button>
      </form>
    );
  }
}

export default PlaylistForm;
