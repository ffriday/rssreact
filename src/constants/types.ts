export type TAstronomicalLocation = {
  name: string;
  uid: string;
};

export type TAstronomicalObject = {
  astronomicalObjectType: string;
  name: string;
  uid: string;
  location: TAstronomicalLocation;
};

export type TSearchParams = {
  query: string;
  pageNumber?: number;
  pageSize?: number;
};

export type TSearchPage = {
  firstPage: boolean;
  lastPage: boolean;
  numberOfElements: number;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};

export type TSearchContext = {
  queryParams: TSearchPage;
  uid: string;
};

export type TSort = {
  clauses: [];
};

export type TSearchResponse = {
  astronomicalObjects: TAstronomicalObject[];
  page: TSearchPage;
  sort: TSort;
};

export type TAstroObjectList = {
  AstromicalObject: TAstronomicalObject[];
};

export type TMessage = {
  message: string;
  type?: MessageType;
};

export enum LSKey {
  lastSearch = 'lastSearch',
}

export enum MessageType {
  error = 'red',
  info = 'lime',
}

export enum TErrorInfo {
  empty = 'No Results',
  sorry = 'Sorry.. there was an error',
  testError = 'Test error',
}

export enum QueryParams {
  query = 'query',
  pageNumber = 'pageNumber',
  pageSize = 'pageSize',
  defaultPageSize = '10',
}
