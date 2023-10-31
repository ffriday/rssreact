import { Component, ReactNode } from 'react';
import { LSKey } from '../constants/types';

type TSearch = {
  defaultValue: string;
  searchHandler: (value: string) => void;
};

export default class Search extends Component<TSearch> {
  constructor(props: TSearch) {
    super(props);
  }

  loadLastSearch = (): string =>
    window.localStorage.getItem(LSKey.lastSearch) ?? '';

  search = (): void => {
    window.localStorage.setItem(LSKey.lastSearch, this.state.currentSearch);
    this.props.searchHandler(this.state.currentSearch);
  };

  state = {
    currentSearch: this.props.defaultValue,
  };

  render(): ReactNode {
    return (
      <>
        <input
          onKeyUp={(e) => {
            if (e.key === 'Enter') this.search();
          }}
          value={this.state.currentSearch}
          onChange={(e) => this.setState({ currentSearch: e.target.value })}
          placeholder="Type something"
          className="flex h-6 sm:h-7 content-center justify-center flex-wrap rounded mt-1"
          type='search'
        ></input>
        <button
          onClick={this.search}
          className="flex h-6 sm:h-7 content-center justify-center flex-wrap bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5 mt-1"
        >
          Search
        </button>
      </>
    );
  }
}
