import { Component, ReactNode } from 'react';
import AstroObject from './AstroObject';
import { TAstroObjectState } from '../constants/types';

export default class AstroObjectList extends Component<TAstroObjectState> {
  constructor(props: TAstroObjectState) {
    super(props);
  }

  render(): ReactNode {
    return (
      <ul className="flex flex-col gap-1 px-2">
        {this.props.AstromicalObject.map((element) => (
          <AstroObject key={element.uid} {...element} />
        ))}
      </ul>
    );
  }
}
