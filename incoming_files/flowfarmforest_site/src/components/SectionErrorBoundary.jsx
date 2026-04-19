import React from 'react';

export default class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('[SectionErrorBoundary]', this.props.section?.section_type, this.props.section?.id, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto my-6 max-w-6xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          This section could not be displayed safely: {this.props.section?.section_type || 'Unknown section'}.
        </div>
      );
    }

    return this.props.children;
  }
}