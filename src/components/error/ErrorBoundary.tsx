import ErrorMessage from '@/pages/404';
import React, {ReactNode, ErrorInfo} from 'react'
import { TErrorInfo } from '../constants/types';

type TProps = {
  children?: ReactNode;
};

type TState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo })
  }
  render() {
    if (this.state.hasError) {
      if (this.state.hasError) {
        return <ErrorMessage message={TErrorInfo.sorry} />;
      }
    }
 
    return this.props.children
  }
}
 
export default ErrorBoundary