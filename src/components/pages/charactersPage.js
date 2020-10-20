import React, { Component } from 'react';
import gotService from '../../services/gotServise';
import ItemList from '../itemList/itemList';
import RowBlock from '../rowBlock/rowBlock';
import ItemDetails, {Field} from '../itemDetails/itemDetails';
import ErrorMessage from '../errorMessage/errorMessage';

export default class CharacterPage  extends Component {
  gotService = new gotService();
  
  state = {
    selectedChar: 191,
    error: false
  }

  componentDidCatch() { 
    this.setState({ error: true }) 
  }

  onItemSelected = (id) => { 
    this.setState({ selectedChar: id }) 
  }  

  render() {
    const {selectedChar, error} = this.state;

    if (error) { return <ErrorMessage/> }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllCharacters}
        renderItem={({name, gender}) => `${name} (${gender})`}
      />
    )

    const itemDetails = (
      <ItemDetails 
        elemId={selectedChar}
        getDataId={this.gotService.getCharacter}
      >
        <Field field="gender" label="Gender" />
        <Field field="born" label="Born" />
        <Field field="died" label="Died" />
        <Field field="culture" label="Culture" />
      </ItemDetails>
    )

    return (
      <RowBlock
        left={itemList}
        right={itemDetails}
        name={'Characters'}
      />
    );
  }
} ;