export type TAstronomicalLocation = {
  name: string;
  uid: string;
};

type TAstronomicalBaseObject = {
  astronomicalObjectType: string;
  name: string;
  uid: string;
};

export type TAstronomicalObject = TAstronomicalBaseObject & {
  location: TAstronomicalLocation;
};

export type TSingleAstronomicalObject = TAstronomicalBaseObject & {
  location: TAstronomicalObject;
  astronomicalObjects: TAstronomicalObject[];
};

export type WrappedAstroObject = {
  astronomicalObject: TSingleAstronomicalObject;
};

export type TSearchParams = {
  query: string;
  pageNumber?: number;
  pageSize?: number;
  uid?: string;
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
  itemsPerPage: number;
};

export type TAppState = {
  state: TSearchContext;
  updateState: (newState: Partial<TSearchContext>) => void;
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
  error = 'bg-red-500',
  info = 'bg-lime-500',
}

export enum TErrorInfo {
  empty = 'No Results',
  sorry = 'Sorry.. there was an error',
  testError = 'Test error',
  notFound = '404 Page not found',
}

export enum QueryParams {
  query = 'query',
  pageNumber = 'pageNumber',
  pageSize = 'pageSize',
  defaultPageSize = '8',
  uid = 'uid',
}
