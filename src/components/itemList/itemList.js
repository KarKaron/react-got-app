import React, { Component } from 'react';
import gotService from '../../services/gotServise';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import styled from 'styled-components';

const ListGroup = styled.ul`
  margin-bottom: 20px!important;
`;

const ListGroupItem = styled.li`
  cursor: pointer;
`;

export default class ItemList extends Component {

  gotService = new gotService();  
  state = {
    charlist: null,
    error: false
  }

  componentDidCatch() {
    this.setState({
      error: true
    })
  }

  componentDidMount() {
    this.gotService.getAllCharacters()
        .then((charlist) => {
          this.setState({
            charlist
          })
        })
  }

  renderItem(arr) {
    return arr.map((item) => {
      const {id, name} = item;
      return (
        <ListGroupItem 
          key={id} 
          className="list-group-item"
          onClick={ () => this.props.onCharSelected(id) }
        >
          {name}
        </ListGroupItem>
      )
    })
  } 

  render() {

    const {charlist, error} = this.state;

    if (error) {
      return <ErrorMessage/>
    }

    if (!charlist) {
      return <Spinner/>
    }

    const items = this.renderItem(charlist);

    return (
      <ListGroup className="item-list list-group">
        {items}
      </ListGroup>
    );
  }
}