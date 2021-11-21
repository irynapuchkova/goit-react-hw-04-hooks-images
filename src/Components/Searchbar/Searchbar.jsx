import PropTypes from 'prop-types';

import {
  SearchbarHeader,
  Form,
  Button,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  
  const handleSubmit = e => {
    e.preventDefault();
    const inputValue = e.target.elements.inputValue.value;
  
    onSubmit(inputValue);
  };


  return (
    <SearchbarHeader>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          type="text"
          name="inputValue"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
