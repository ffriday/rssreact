import { Component, ReactNode } from 'react';
import { TAstromicalObject } from '../constants/types';

export default class AstroObject extends Component<TAstromicalObject> {
  constructor(props: TAstromicalObject) {
    super(props);
  }

  render(): ReactNode {
    return (
      <li className="flex flex-col bg-gray-600 font-mon pl-2 text-white">
        <h3>Name: {this.props.name}</h3>
        <p>Object type: {this.props.astronomicalObjectType}</p>
        <p>
          Location: {this.props.location ? this.props.location.name : 'Unknown'}
        </p>
      </li>
    );
  }
}
