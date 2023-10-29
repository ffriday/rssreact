import { Component, ReactNode } from 'react';
import Search from './search/Search';

export default class App extends Component {
  render(): ReactNode {
    return (
      <main className="flex flex-col justify-top h-screen bg-gray-700 font-mono">
        <nav className="h-15 sm:h-10 flex flex-row flex-wrap content-center justify-start">
          <h1 className="text-xl sm:text-2xl w-screen sm:w-max sm:pr-10 font-bold text-red-400 text-left">
            RSS Astro Objects
          </h1>
          <Search />
        </nav>
        <section className="h-auto">CONTENT</section>
      </main>
    );
  }
}
