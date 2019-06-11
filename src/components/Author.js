// @flow
import React from 'react';
import {Text, FlatList} from 'react-native';
import styled from '@emotion/native';

type AuthorType = {
  id: string,
  volumeInfo: {
    title: string,
    publishedDate: string,
  },
};

type Props = {
  authors: ?Array<AuthorType>,
};

class Author extends React.Component<Props> {
  renderList = (authors: Array<AuthorType>) => {
    return (
      <List>
        <FlatList
          data={authors}
          renderItem={({item}) => {
            return (
              <Text>
                {item.volumeInfo.title} ( {item.volumeInfo.publishedDate} )
              </Text>
            );
          }}
          keyExtractor={({id}) => id}
        />
      </List>
    );
  };

  render() {
    const {authors} = this.props;
    if (authors == null) return null;

    return <RootStyled>{this.renderList(authors)}</RootStyled>;
  }
}

const List = styled.View`
  height: 200px;
  border: 1px solid red;
`;

const RootStyled = styled.View``;

export default Author;
