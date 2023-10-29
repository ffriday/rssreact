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

export type TAstroObjectState = {
  AstromicalObject: TAstromicalObject[];
};