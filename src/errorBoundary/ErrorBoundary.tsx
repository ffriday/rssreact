import { Component, ErrorInfo, ReactNode } from 'react';

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
      return (
        <div className='flex justify-center flex-col gap-4 content-center h-full bg-gray-700 font-mono text-xl'>
          <h1 className='text-center'>Sorry.. there was an error</h1>
          <a href="/" className='text-center text-red-950'>Back to main page</a>
        </div>
      );
    }

    return this.props.children;
  }
}
