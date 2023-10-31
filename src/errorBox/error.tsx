import { Component, ReactNode } from 'react';
import { TColor, TError } from '../constants/types';

export default class ErrorBox extends Component<TError> {
  private color = this.props.color ?? TColor.red;

  render(): ReactNode {
    return (
      <div
        className={`flex bg-${this.color}-500 font-mon pl-2 text-white content-center justify-center`}
      >
        {this.props.error}
      </div>
    );
  }
}
