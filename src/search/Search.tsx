import { Component, ReactNode } from 'react';

type TSearch = {
  searchHandler: (value: string) => void;
};

enum LSKey {
  lastSearch = 'lastSearch',
};

export default class Search extends Component<TSearch> {
  constructor(props: TSearch) {
    super(props);
    console.log(this.props);
  }

  loadLastSearch = (): string => window.localStorage.getItem(LSKey.lastSearch) ?? '';

  search = (): void => {
    window.localStorage.setItem(LSKey.lastSearch, this.state.currentSearch);
    this.props.searchHandler(this.state.currentSearch);
  }

  state = {
    currentSearch: this.loadLastSearch(),
  }

  componentDidMount() {

  }

  render(): ReactNode {
    return (
      <>
        <input value={this.state.currentSearch} onChange={(e) => this.setState({currentSearch: e.target.value})} className="flex h-6 sm:h-7 content-center justify-center flex-wrap rounded"></input>
        <button onClick={this.search} className="flex h-6 sm:h-7 content-center justify-center flex-wrap bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5">
          Search
        </button>
      </>
    );
  }
}
