import React, {Component} from 'react';
import PropTypes from 'prop-types';

import DataTable from 'jsx/DataTable';
import Filter from 'jsx/Filter';

/**
 * FilterableDataTable component.
 * A wrapper for all datatables that handles filtering.
 *
 * Handles the updating and clearing of the filter state based on changes sent
 * from the FitlerForm.
 *
 * Passes the Filter to the Datatable.
 *
 * Deprecates Filter Form.
 */
class FilterableDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {},
    };
    this.updateFilter = this.updateFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  /**
   * Updates filter state
   *
   * @param {object} filter passed from FilterForm
   */
  updateFilter(filter) {
    this.setState({filter});
  }

  /**
   * Sets Filter to empty object
   */
  clearFilter() {
    this.updateFilter({});
  }

  render() {
    return (
      <div>
        <Filter
          name={this.props.name + '_filter'}
          id={this.props.name + '_filter'}
          columns={this.props.columns}
          filter={this.state.filter}
          fields={this.props.fields}
          updateFilter={this.updateFilter}
          clearFilter={this.clearFilter}
        />
        <DataTable
          data={this.props.data}
          fields={this.props.fields}
          filter={this.state.filter}
          getFormattedCell={this.props.getFormattedCell}
        />
      </div>);
  }
}

FilterableDataTable.defaultProps = {
  columns: 3,
};

FilterableDataTable.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  columns: PropTypes.number,
  getFormattedCell: PropTypes.func,
};

export default FilterableDataTable;
