import React, { useState, useEffect } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
//import PropTypes from 'prop-types';

import styled from 'styled-components';

const ListGroup = styled.ul`
  margin-bottom: 30px!important;
`;
const ListGroupItem = styled.li`
  cursor: pointer;
`;
function ItemList({getData, renderItem, onItemSelected}) {

  const [itemList, updateList] = useState(null);
  const [error, updateError] = useState(false);
  // state = {
  //   itemList: null,
  //   error: false
  // }

  // static defaultProps = {
  //   onItemSelected: () => {}
  // }
  
  // static propTypes = {
  //   onItemSelected: PropTypes.func,
  //   //getData: PropTypes.arrayOf(PropTypes.object)
  // }

  useEffect(() => {
    getData()
      .then((data) => {
        updateList(data)
      })
    return () => {
      updateError(true)
    }  
  }, []);

  // componentDidCatch() { 
  //   this.setState({ error: true }) 
  // }
  
  // componentDidMount() {

  //   getData()
  //     .then((itemList) => {
  //       this.setState({ itemList })
  //     })
  // }

  function renderItems(arr) {
    return arr.map((item) => {

      const {id} = item;
      const label = renderItem(item);
      
      return (
        <ListGroupItem 
          key={id} 
          className="list-group-item"
          onClick={ () => onItemSelected(id) }
        >
          {label}
        </ListGroupItem>
      )
    })
  } 

  // render() {
  //   const {itemList, error} = this.state;

  //   if (error) { return <ErrorMessage/> }

  //   if (!itemList) { return <Spinner/> }

  //   const items = this.renderItems(itemList);

  //   return (
  //     <ListGroup className="item-list list-group">
  //       {items}
  //     </ListGroup>
  //   );
  // }

  if (error) { return <ErrorMessage/> }

  if (!itemList) { return <Spinner/> }

  const items = renderItems(itemList);

  return (
    <ListGroup className="item-list list-group">
      {items}
    </ListGroup>
  );
}

// ItemList.defaultProps = {
//   onItemSelected: () => {}
// }

// ItemList.propTypes = {
//   onItemSelected: PropTypes.func,
//   getData: PropTypes.arrayOf(PropTypes.object)
// }

export default ItemList;