import { Component, ReactNode } from 'react';

export default class Search extends Component {
  render(): ReactNode {
    return (
      <>
        <input className="flex h-6 sm:h-7 content-center justify-center flex-wrap rounded"></input>
        <button className="flex h-6 sm:h-7 content-center justify-center flex-wrap bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5">
          Search
        </button>
      </>
    );
  }
}
