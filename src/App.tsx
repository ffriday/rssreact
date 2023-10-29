import { Component, ReactNode } from 'react';
import Search from './search/Search';
import { apiEnv } from './constants/env';

type TAstronomicalLocation = {
  name: string;
  uid: string;
}

export type TAstromicalObject = {
  astronomicalObjectType: string;
  name: string;
  uid: string;
  location: TAstronomicalLocation;
};

export default class App extends Component {
  request = async (name: string, pageSize: number) => {
    return await fetch(`${apiEnv.url}${apiEnv.endpoint}?name=${name}&pageSize=${pageSize}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  };

  search = async (value: string) => {
    const res = await this.request(value, 10)
    const body: TAstromicalObject[] = await res.json();
    console.log(body);
  };

  state: Readonly<object> = {

  };

  render(): ReactNode {
    return (
      <main className="flex flex-col justify-top h-screen bg-gray-700 font-mono">
        <nav className="h-15 sm:h-10 flex flex-row flex-wrap content-center justify-start">
          <h1 className="text-xl sm:text-2xl w-screen sm:w-max sm:pr-10 font-bold text-red-400 text-left">
            RSS Astro Objects
          </h1>
          <Search searchHandler={this.search} />
        </nav>
        <section className="h-auto">CONTENT</section>
      </main>
    );
  }
}
