import { Component, ReactNode } from 'react';
import Search from './search/Search';
import { apiEnv } from './constants/env';
import AstroObjectList from './content/AstroObjectList';
import { TAstroObjectState, TAstromicalObject } from './constants/types';

type TBodyResponse = {
  astronomicalObjects: TAstromicalObject[];
};

export default class App extends Component {
  request = async (name: string, pageSize: number) => {
    return await fetch(
      `${apiEnv.url}${apiEnv.endpoint}?name=${name}&pageSize=${pageSize}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  };

  search = async (value: string) => {
    const res = await this.request(value, 50);
    if (res.ok) {
      const { astronomicalObjects }: TBodyResponse = await res.json();
      this.setState({ AstromicalObject: astronomicalObjects });
    }
  };

  state: Readonly<TAstroObjectState> = {
    AstromicalObject: [],
  };

  render(): ReactNode {
    return (
      <main className="flex flex-col justify-top h-full bg-gray-700 font-mono">
        <nav className="h-15 sm:h-10 flex flex-row flex-wrap content-center justify-start pb-2">
          <h1 className="text-xl sm:text-2xl w-screen sm:w-max sm:pr-10 font-bold text-red-400 text-left">
            RSS Astro Objects
          </h1>
          <Search searchHandler={this.search} />
        </nav>
        <section className="h-auto bg-gray-700">
          <AstroObjectList AstromicalObject={this.state.AstromicalObject} />
        </section>
      </main>
    );
  }
}
