// import { Component } from 'react';
import { useState } from 'react';

import { ImSearch } from 'react-icons/im';

import PropTypes from 'prop-types';

import styles from './searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  function handleValueChange({ target }) {
    setValue(target.value);
  }

  function heandleSubmit(e) {
    e.preventDefault();
    onSubmit(value);
  }

  return (
    <header className={styles.searchbar}>
      <form onSubmit={heandleSubmit} className={styles.searchForm}>
        <button type="submit" className={styles.searchFormButton}>
          <ImSearch />
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={handleValueChange}
          value={value}
          className={styles.searchFormInput}
          type="text"
          placeholder="Search images and photos"
          required
          autoComplete="off"
          autoFocus
        />
      </form>
    </header>
  );
}

Searchbar.defaltProps = {
  onSubmit: () => {},
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


// class OldSearchbar extends Component {

// // state = {
// //   value: '',
// // };

// // handleValueChange = ({ target: { value} }) => {
// //   this.setState({ value })
// // };

// // heandleSubmit = (e) => {
// //   e.preventDefault();
// //   const { onSubmit } = this.props;
// //   const { value } = this.state;
// //   onSubmit(value)
// // }

// // render() {
// // const { handleValueChange, heandleSubmit } = this;
// // const { value } = this.state;
// // return (
// //   <header className={styles.searchbar}>
// //     <form onSubmit={heandleSubmit} className={styles.searchForm}>
// //       <button type="submit" className={styles.searchFormButton}>
// //         <ImSearch />
// //         <span className={styles.searchFormButtonLabel}>Search</span>
// //       </button>

// //       <input
// //         onChange={handleValueChange}
// //         value={value}
// //         className={styles.searchFormInput}
// //         type="text"
// //         placeholder="Search images and photos"
// //         required
// //         autoComplete="off"
// //         autoFocus
// //       />
// //     </form>
// //   </header>
// // );
// // }
// }

