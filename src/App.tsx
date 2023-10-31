import { Component, ReactNode } from 'react';
import Search from './search/Search';
import { apiEnv } from './constants/env';
import AstroObjectList from './content/AstroObjectList';
import {
  TAstroObjectList,
  TAstromicalObject,
  TColor,
  TError,
  TErrorInfo,
} from './constants/types';
import { loadLastSearch } from './helpers/helpers';
import ErrorBox from './errorBox/error';

type TBodyResponse = {
  astronomicalObjects: TAstromicalObject[];
};

type TAppState = TAstroObjectList &
  TError & {
    loading: boolean;
  };

export default class App extends Component {
  private lastSearch = loadLastSearch();

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

  componentDidMount() {
    this.search(this.lastSearch);
  }

  search = async (value: string) => {
    this.setState({ error: '' });
    this.setState({ loading: true });
    try {
      const res = await this.request(value, 50);
      if (res.ok) {
        const { astronomicalObjects }: TBodyResponse = await res.json();
        this.setState({ AstromicalObject: astronomicalObjects });
        if (!astronomicalObjects.length)
          this.setState({ error: TErrorInfo.empty });
      }
    } catch (error) {
      if (error instanceof Error) this.setState({ error: error.message });
    }
    this.setState({ loading: false });
  };

  fakeError = () => {
    try {
      {
        throw new Error('Test error');
      }
    } catch (error) {
      if (error instanceof Error) this.setState({ error: error.message });
    }
  };

  state: Readonly<TAppState> = {
    AstromicalObject: [],
    error: '',
    loading: false,
  };

  render(): ReactNode {
    if (this.state.error && this.state.error !== TErrorInfo.empty)
      throw new Error('Test error');
    return (
      <main className="flex flex-col justify-top h-full bg-gray-700 font-mono">
        <nav className="h-15 sm:h-10 flex flex-row flex-wrap content-center justify-start pb-2">
          <h1 className="text-xl sm:text-2xl w-screen sm:w-max sm:pr-10 font-bold text-red-400 text-left">
            RSS Astro Objects
          </h1>
          <Search searchHandler={this.search} defaultValue={this.lastSearch} />
          <button
            onClick={this.fakeError}
            className="flex h-6 sm:h-7 content-center justify-center flex-wrap bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-5 mt-1"
          >
            Error
          </button>
        </nav>
        <section className="h-auto bg-gray-700">
          {this.state.loading && <ErrorBox error="Loading..." color={TColor.lime} />}
          {this.state.error ? (
            <ErrorBox error={this.state.error} color={TColor.red} />
          ) : (
            <AstroObjectList AstromicalObject={this.state.AstromicalObject} />
          )}
        </section>
      </main>
    );
  }
}
