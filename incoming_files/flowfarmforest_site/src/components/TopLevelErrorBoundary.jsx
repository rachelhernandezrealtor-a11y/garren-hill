import React from 'react';

export default class TopLevelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('[TopLevelErrorBoundary]', this.props.label, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto my-4 max-w-6xl rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {this.props.message || 'A page area failed to render.'}
        </div>
      );
    }

    return this.props.children;
  }
}