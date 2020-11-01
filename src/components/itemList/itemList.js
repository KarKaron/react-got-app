import React, { Component } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const ListGroup = styled.ul`
  margin-bottom: 30px!important;
`;
const ListGroupItem = styled.li`
  cursor: pointer;
`;

export default class ItemList extends Component {
  state = {
    itemList: null,
    error: false
  }

  static defaultProps = {
    onItemSelected: () => {}
  }
  
  static propTypes = {
    onItemSelected: PropTypes.func,
    //getData: PropTypes.arrayOf(PropTypes.object)
  }

  componentDidCatch() { 
    this.setState({ error: true }) 
  }
  
  componentDidMount() {
    const {getData} = this.props;

    getData()
        .then((itemList) => {
          this.setState({ itemList })
        })
  }

  renderItems(arr) {
    return arr.map((item) => {

      const {id} = item;
      const label = this.props.renderItem(item);
      
      return (
        <ListGroupItem 
          key={id} 
          className="list-group-item"
          onClick={ () => this.props.onItemSelected(id) }
        >
          {label}
        </ListGroupItem>
      )
    })
  } 

  render() {
    const {itemList, error} = this.state;

    if (error) { return <ErrorMessage/> }

    if (!itemList) { return <Spinner/> }

    const items = this.renderItems(itemList);

    return (
      <ListGroup className="item-list list-group">
        {items}
      </ListGroup>
    );
  }
}

// ItemList.defaultProps = {
//   onItemSelected: () => {}
// }

// ItemList.propTypes = {
//   onItemSelected: PropTypes.func,
//   getData: PropTypes.arrayOf(PropTypes.object)
// }