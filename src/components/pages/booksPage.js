import React, { Component } from 'react';
import gotService from '../../services/gotServise';
import ItemList from '../itemList/itemList';
import RowBlock from '../rowBlock/rowBlock';
import ItemDetails, {Field} from '../itemDetails/itemDetails';
import ErrorMessage from '../errorMessage/errorMessage';

export default class BooksPage  extends Component {
  gotService = new gotService();
  
  state = {
    selectedBook: 1,
    error: false
  }

  componentDidCatch() { 
    this.setState({ error: true }) 
  }

  onItemSelected = (id) => { 
    this.setState({ selectedBook: id }) 
  }  

  render() {
    const {selectedBook, error} = this.state;

    if (error) { return <ErrorMessage/> }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllBooks}
        renderItem={({name, numberOfPages}) => `${name} (${numberOfPages})`}
      />
    )

    const itemDetails = (
      <ItemDetails 
        elemId={selectedBook}
        getDataId={this.gotService.getBooks}
      >
        <Field field="numberOfPages" label="Count Pages" />
        <Field field="publiser" label="Publiser" />
        <Field field="released" label="Released" />
        <Field field="culture" label="Culture" />
      </ItemDetails>
    )

    return (
      <RowBlock
        left={itemList}
        right={itemDetails}
        name={'Books'}
      />
    );
  }
} ;