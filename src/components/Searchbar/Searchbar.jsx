import { useState } from 'react';
import css from './Searchbar.module.css';
import { BiSearchAlt2 } from 'react-icons/bi';
import PropTypes from 'prop-types';


  const Searchbar = ({ setQuery }) => {
  const [q, setQ] = useState('');

  const onSubmit = event => {
    event.preventDefault();
    setQuery(q);
    setQ('');
  };

    return (
      <header className= {css.searchbar}>
        <form className= {css.searchForm} onSubmit={onSubmit}>
          <button type="submit" className= {css.searchFormButton}>
              <BiSearchAlt2 size="20px" />
          </button >
          <input
            type="text"
            value={q}
            onChange= {event => setQ(event.target.value)}
            className= {css.searchFormInput}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }

  Searchbar.propTypes = {
  setQuery: PropTypes.func.isRequired,
}

export default Searchbar;
