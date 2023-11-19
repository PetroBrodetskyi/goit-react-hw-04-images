import React, { useState } from 'react';
import css from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.searchbar}>
      <div className={css.searchhover}>
        <form className={css.searchform} onSubmit={handleSubmit}>
          <button className={css.searchformbutton} type="submit">
            <FiSearch size={25} stroke="#3f51b5" />
          </button>

          <input
            className={css.searchforminput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
          />
        </form>
      </div>
    </header>
  );
};

export default Searchbar;
