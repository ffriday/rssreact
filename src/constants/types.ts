export type TAstronomicalLocation = {
  name: string;
  uid: string;
};

export type TAstromicalObject = {
  astronomicalObjectType: string;
  name: string;
  uid: string;
  location: TAstronomicalLocation;
};

export type TAstroObjectList = {
  AstromicalObject: TAstromicalObject[];
};

export type TError = {
  error: string;
};

export enum LSKey {
  lastSearch = 'lastSearch',
}

export enum TErrorInfo {
  empty = 'No Results',
}
