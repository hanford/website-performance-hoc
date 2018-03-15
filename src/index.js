import React, { PureComponent } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'
import websitePerformance from 'website-performance'
import window from 'global/window'

export default function WithWebPerformance (WrappedComponent, opts = { eventName: 'Site.Load' }) {
  class WithWebPerformanceComponent extends PureComponent {
    componentDidMount () {
      if (window.analytics && window.analytics.track) {
        window.ananyltics.track(opts.eventName, { ...websitePerformance() })
      } else {
        console.warn('window.analytics is not defined')
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  return hoistNonReactStatic(WithWebPerformanceComponent, WrappedComponent)
}
