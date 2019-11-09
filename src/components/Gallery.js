import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
export default class CardExample extends Component {
  render() {
    return (
      <Container>
        
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>
                   {this.props.eventID}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}