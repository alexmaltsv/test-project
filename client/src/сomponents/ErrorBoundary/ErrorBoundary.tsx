import React, { Component, ReactNode } from 'react';

type ErrorBoundaryProps = {
  errorView: ReactNode;
  children: ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { error: false };

  componentDidCatch(): void {
    this.setState({ error: true });
  }

  render(): React.ReactNode {
    const { errorView, children } = this.props;
    const { error } = this.state;

    return error ? errorView : children;
  }
}

export default ErrorBoundary;
