import css from './filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ filter, onFilterChange }) => {
  return (
    <div className={css.filter}>
      <p className={css.textFilter}>Find contact by name</p>
      <input
        className={css.inputFilter}
        type="text"
        value={filter}
        onChange={onFilterChange}
        placeholder="Search by name"
      />
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
