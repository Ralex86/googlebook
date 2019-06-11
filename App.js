// @flow
import React from 'react';
import {Text, View, Button} from 'react-native';
import styled from '@emotion/native';

import Author from './src/components/Author';

type State = {
  name: string,
  payload: ?Array<any>,
};

export default class App extends React.Component<*, State> {
  state = {
    name: '',
    payload: null,
  };

  fetchAuthor(name: string) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${name}`)
      .then(res => res.json())
      .then(resJson => {
        const {items} = resJson;
        this.setState({payload: items});
      });
  }

  render() {
    const {name, payload} = this.state;
    return (
      <RootStyled>
        <NameInput
          onChangeText={name => this.setState({name})}
          value={this.state.name}
        />
        <Button
          onPress={() => this.fetchAuthor(name)}
          title="Find author"
          color="red"
          accessibilityLabel="Search an author"
        />
        <Author authors={payload} />
      </RootStyled>
    );
  }
}

const NameInput = styled.TextInput`
  border: 1px solid gray;
  width: 120px;
  height: 40px;
`;

const RootStyled = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
