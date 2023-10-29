import { Component, ReactNode } from 'react';

export default class App extends Component {
  render(): ReactNode {
    return (
      <main className="flex flex-col justify-top h-screen bg-gray-700 font-mono">
        <nav className='h-1/6 flex flex-row content-start gap-10'>
          <h1 className="text-2xl font-bold text-red-400 text-left">
            RSS Astro Objects
          </h1>
        </nav>
        <section className='h-auto'>
          CONTENT
        </section>
      </main>
    );
  }
}
