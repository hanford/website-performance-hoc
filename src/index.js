import React, { PureComponent } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'
import websitePerformance from 'website-performance'
import window from 'global/window'
import document from 'global/document'
import rc from 'request-callback'

const withWebsitePerformance = provider => (WrappedComponent, opts = { eventName: 'Site.Load' }) => {
  class WithWebPerformanceComponent extends PureComponent {
    componentDidMount () {
      rc(() => {
        const payload = websitePerformance()
        let hasLoaded = true

        // if anything in window.performance.timing is less than or equal to 0, window.onload hasn't fired yet,
        // so once it does fire, we need invoke our track function, but not before then
        Object.keys(payload).forEach(e => {
          if (0 >= payload[e]) {
            hasLoaded = false
          }
        })

        if (hasLoaded) {
          this.track()
        } else {
          window.onload = this.track
        }
      })
    }

    track = () => {
      const name = opts.eventName
      const payload = websitePerformance()

      // we're using request.callback to only track these events when the browser has free cycles
      if (provider && provider.track) {
        rc(() => provider.track(name, payload))
      } else {
        console.warn('website-performance-hoc: Provider is undefined, nothing tracked')
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  return hoistNonReactStatic(WithWebPerformanceComponent, WrappedComponent)
}

export default withWebsitePerformance
