import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorMessage from './errorMessage';

type TProps = {
  children?: ReactNode;
};

type TState = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = { hasError: false };
  }

  public state: TState = {
    hasError: false,
  };

  static getDerivedStateFromError(): TState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}
