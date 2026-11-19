/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Application Error Boundary
 */

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Application rendering error:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.assign('/');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F5F4EF] text-[#292B27] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white p-8 rounded-[2px] border border-[#292B27]/15 text-center space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C6A65B]">
              K S Associates
            </span>
            <h1 className="text-2xl font-heading font-semibold text-[#343A24]">
              Unable to Display This View
            </h1>
            <p className="text-sm text-[#4A4D46] leading-relaxed">
              An unexpected error occurred while loading this section. Please reload the page to continue.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="px-5 py-2.5 bg-[#343A24] text-[#C6A65B] hover:bg-[#242918] text-xs font-semibold uppercase tracking-wider rounded-[3px] transition-colors"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
