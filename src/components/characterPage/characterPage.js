import React, { Component } from 'react';
import ItemList from '../itemList/itemList';
import CharDetails from '../charDetails/charDetails';
import ErrorMessage from '../errorMessage/errorMessage';

import { Col, Row } from 'reactstrap';

export default class CharacterPage  extends Component {
  
  state = {
    selectedListItem: null,
    error: false
  }

  onCharSelected = (id) => {
    this.setState({
      selectedListItem: id
    })
  }

  componentDidCatch() {
    this.setState({
      error: true
    })
  }

  render() {

    const {selectedListItem, error} = this.state;

    if (error) {
      return <ErrorMessage/>
    }

    return ( 
      <Row>
        <Col md='6'>
          <ItemList
            onCharSelected={this.onCharSelected}
          />
        </Col>
        <Col md='6'>
          <CharDetails
            charId={selectedListItem}
          />
        </Col>
      </Row>
     );
  }
} ;