import { Component, ReactNode } from 'react';
import { TError } from '../constants/types';

export default class ErrorBox extends Component<TError> {
  constructor(props: TError) {
    super(props);
  }

  render(): ReactNode {
    return (
      <div className="flex bg-red-500 font-mon pl-2 text-white content-center justify-center">
        {this.props.error}
      </div>
    );
  }
}
