import React, { Component, Children, cloneElement } from 'react';
import gotService from '../../services/gotServise';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import styled from 'styled-components';

const ItemDetail = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  border-radius: 4px;
`;
const ItemDetailTitle = styled.h4`
  margin-bottom: 20px;
  text-align: center;
`;
const Term = styled.span`
  font-weight: bold;
`;
const Data = styled.span`
  color: grey;
  margin-left: 10px;
`;

const Field = ({element, field, label}) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <Term>{label}</Term>
      <Data>{element[field]}</Data>
    </li>
  )
}

export {Field}

export default class ItemDetails extends Component {
  gotService = new gotService();

  state = {
    element: null,
    loading: true,
    error: false
  }

  componentDidCatch() { 
    this.setState({ error: true }) 
  }

  componentDidMount() { 
    this.updateItem(); 
  }
  
  componentDidUpdate(prevProps) { 
    if (this.props.elemId !== prevProps.elemId) { this.updateItem(); } 
  }

  onItemDetailsLoaded = (element) => {
    this.setState({
        element,
        loading: false
    })
  }

  updateItem() {    
    const {elemId, getDataId} = this.props;

    if (!elemId) { return; }

    this.setState({ loading: true })

    getDataId(elemId)
      .then((element) => {
        this.setState({
          element: element,
          loading: false
        })
    })
  }

  onError() {
    this.setState({
        element: null,
        error: true
    })
  }

  render() {
    const {element, loading, error} = this.state;

    if (error) { return <ErrorMessage/> }
    
    if (loading) {
      return (
        <ItemDetail>
          <Spinner/>
        </ItemDetail>
      )
    }

    const {name} = element;

    return (
      <ItemDetail>
        <ItemDetailTitle>{name}</ItemDetailTitle>
        <ul className="list-group list-group-flush">
          {
            Children.map(this.props.children, (child) => {
              return cloneElement(child, {element})
            })
          } 
        </ul>      
      </ItemDetail>
    );
  }
}