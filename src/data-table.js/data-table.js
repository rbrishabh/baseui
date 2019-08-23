/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {Button} from '../button/index.js';
import {Checkbox, STYLE_TYPE} from '../checkbox/index.js';
import {StatefulPopover} from '../popover/index.js';
import {useStyletron} from '../styles/index.js';
import {Tag} from '../tag/index.js';

type CategoricalColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: 'CATEGORICAL',
|};

type CategoricalFilterParameters = {|
  selection: Set<string>,
  exclude: boolean,
|};

type NumericalColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: 'NUMERICAL',
  format: 'ACCOUNTING' | 'PERCENTAGE' | 'NONE',
  highlightNegative?: boolean,
  precision?: number,
|};

type BooleanColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: 'BOOLEAN',
|};

type StringColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: 'STRING',
|};

type CustomColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: 'CUSTOM',
  renderCell: React.ComponentType<{data: any}>,
  renderFilter?: React.ComponentType<{
    setFilter: (filterParams: any, description: string) => void,
    close: () => void,
  }>,
  buildFilter?: any => any => boolean,
  sortFn?: (any, any) => number,
|};

type Row = {
  data: any[],
};

type Columns =
  | CategoricalColumn
  | NumericalColumn
  | BooleanColumn
  | StringColumn
  | CustomColumn;

type Props = {
  columns: Array<Columns>,
  rows: Row[],
};

function buildCategoricalFilter(params: CategoricalFilterParameters) {
  return function(data: string) {
    const included = params.selection.has(data);
    return params.exclude ? !included : included;
  };
}

function sortFnByColumn(column: Columns) {
  switch (column.kind) {
    case 'CATEGORICAL':
    case 'STRING':
      return function sortCategories(a, b) {
        return a.localeCompare(b);
      };
    case 'NUMERICAL':
      return function sortNumbers(a, b) {
        return b - a;
      };
    case 'BOOLEAN':
      return function sortBooleans(a, b) {
        if (a === b) return 0;
        return a ? -1 : 1;
      };
    case 'CUSTOM':
      if (column.sortFn) {
        return column.sortFn;
      } else {
        return (a, b) => 0;
      }
    default:
      return (a, b) => 0;
  }
}

function buildFilterFnByColumn(column: Columns) {
  switch (column.kind) {
    case 'CATEGORICAL':
      return buildCategoricalFilter;
    case 'STRING':
      return params => any => true;
    case 'NUMERICAL':
      return params => any => true;
    case 'BOOLEAN':
      return params => any => true;
    case 'CUSTOM':
      if (column.buildFilter) {
        return column.buildFilter;
      } else {
        return null;
      }
    default:
      return null;
  }
}

function CategoricalFilter(props: {
  data: string[],
  setFilter: (
    filterParams: CategoricalFilterParameters,
    description: string,
  ) => void,
  close: () => void,
}) {
  const [useCss] = useStyletron();
  const [selection, setSelection] = React.useState<Set<string>>(new Set());
  const [exclude, setExclude] = React.useState(false);

  const categories = React.useMemo(() => {
    return props.data.reduce((set, category) => set.add(category), new Set());
  }, [props.data]);

  return (
    <div>
      {Array.from(categories, (category, i) => (
        <Checkbox
          key={i}
          checked={selection.has(category)}
          onChange={() => {
            if (selection.has(category)) {
              selection.delete(category);
            } else {
              selection.add(category);
            }
            setSelection(new Set(selection));
          }}
        >
          {category}
        </Checkbox>
      ))}
      <div className={useCss({display: 'flex'})}>
        <Checkbox
          checked={exclude}
          onChange={() => setExclude(!exclude)}
          checkmarkType={STYLE_TYPE.toggle}
        >
          Exclude
        </Checkbox>
        <Button
          onClick={() => {
            props.setFilter(
              {selection, exclude},
              Array.from(selection).join(', '),
            );
            props.close();
          }}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}

export function DataTable(props: Props) {
  const [sortIndex, setSortIndex] = React.useState(-1);
  const [sortDirection, setSortDirection] = React.useState(null);
  const [filters, setFilters] = React.useState(new Map());

  React.useEffect(() => {
    const titles = props.columns.reduce(
      (set, column) => set.add(column.title),
      new Set(),
    );
    if (titles.size < props.columns.length) {
      console.warn(
        'Columns titles must be unique else will result in non-deterministic filtering.',
      );
    }
  }, [props.columns]);

  function handleSort(columnIndex) {
    if (columnIndex === sortIndex) {
      if (sortDirection === 'ASC') {
        setSortIndex(-1);
        setSortDirection('DESC');
      } else {
        setSortDirection('ASC');
      }
    } else {
      setSortIndex(columnIndex);
      setSortDirection('DESC');
    }
  }

  function addFilter(filterParams, title, description) {
    filters.set(title, {filterParams, description});
    setFilters(new Map(filters));
  }

  function removeFilter(title) {
    filters.delete(title);
    setFilters(new Map(filters));
  }

  const rows = React.useMemo(() => {
    if (sortIndex === -1 && !filters.size) {
      return props.rows;
    }

    let nextRows = [].concat(props.rows);
    if (sortIndex !== -1) {
      const sortFn = sortFnByColumn(props.columns[sortIndex]);
      nextRows.sort((a, b) => sortFn(a.data[sortIndex], b.data[sortIndex]));

      if (sortDirection === 'ASC') {
        nextRows = nextRows.reverse();
      }
    }

    nextRows = Array.from(filters, f => f).reduce((rows, [title, filter]) => {
      const columnIndex = props.columns.findIndex(c => c.title === title);
      const column = props.columns[columnIndex];
      if (!column) {
        return rows;
      }

      const buildFilterFn = buildFilterFnByColumn(column);
      if (!buildFilterFn) {
        return rows;
      }

      const filterFn = buildFilterFn(filter.filterParams);
      return rows.filter(row => filterFn(row.data[columnIndex]));
    }, nextRows);

    return nextRows;
  }, [sortIndex, sortDirection, filters]);

  return (
    <React.Fragment>
      {Array.from(filters).map(([title, filter]) => (
        <Tag onActionClick={() => removeFilter(title)}>
          {title} | {filter.description}
        </Tag>
      ))}
      <table>
        <thead>
          <tr>
            {props.columns.map((column, i) => (
              <th key={i}>
                {column.title}
                <button
                  style={{
                    color: sortIndex === i ? 'pink' : 'unset',
                  }}
                  onClick={() => handleSort(i)}
                >
                  sort
                </button>
                <StatefulPopover
                  content={({close}) => (
                    <CategoricalFilter
                      setFilter={(filterParams, description) =>
                        addFilter(filterParams, column.title, description)
                      }
                      data={props.rows.map(r => r.data[i])}
                      close={close}
                    />
                  )}
                >
                  <button>filter</button>
                </StatefulPopover>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.data.map((d, i) => {
                const column = props.columns[i];
                if (column.kind === 'CATEGORICAL') {
                  return <td>{d}</td>;
                } else if (column.kind === 'NUMERICAL') {
                  return <td>{d}</td>;
                } else if (column.kind === 'BOOLEAN') {
                  return <td>{d ? 'T' : 'F'}</td>;
                } else if (column.kind === 'STRING') {
                  return <td>{d}</td>;
                } else if (column.kind === 'CUSTOM') {
                  const Cell = column.renderCell;
                  return (
                    <td>
                      <Cell data={d} />
                    </td>
                  );
                } else {
                  return null;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}
