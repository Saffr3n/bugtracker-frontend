import React from 'react';
import { onSearchFocus, onSearchBlur } from '../../helpers';
import SearchIcon from '../../assets/icons/search.svg';

export default function SearchBar() {
  const onSearchSubmit = (e) => {
    e.preventDefault();

    const query = e.target.querySelector('input').value;
    const url = `#/search?q=${query}`;

    window.location.assign(url);
  };

  return (
    <form className="search-bar" onSubmit={onSearchSubmit} role="search" noValidate>
      <input type="search" placeholder="Search..." onFocus={onSearchFocus} onBlur={onSearchBlur} aria-label="Search" />
      <button type="submit" className="svg">
        <SearchIcon aria-label="Perform search" />
      </button>
    </form>
  );
}
