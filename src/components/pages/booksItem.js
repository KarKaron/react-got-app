import React, { Component } from 'react';
import gotService from '../../services/gotServise';
import ItemDetails, {Field} from '../itemDetails/itemDetails';

export default class BooksItem extends Component {
  gotService = new gotService();

  render() {

    return ( 
      <ItemDetails 
        elemId={this.props.bookId}
        getDataId={this.gotService.getBooks}
      >
        <Field field="numberOfPages" label="Count Pages" />
        <Field field="publiser" label="Publiser" />
        <Field field="released" label="Released" />
        <Field field="culture" label="Culture" />
      </ItemDetails>
     );
  }
};