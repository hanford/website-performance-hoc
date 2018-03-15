import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

// import Demo from '../demo/src/'
import withTrack from '../src'

export default class DemoComponent extends React.Component {
  render () {
    return (
      <div>
        <h1>website-performance-hoc Demo</h1>
      </div>
    )
  }
}

let invoked = false
let name = ''
let payload = false
let node

describe('WebsitePerformanceHOC', () => {
  beforeEach(() => {
    invoked = false
    name = ''
    payload = false
    node = null

    window.requestIdleCallback = function (cb) { cb() }

    const provider = {
      track: (eventName, eventPayload) => {
        name = eventName
        invoked = true
        payload = eventPayload
      }
    }

    let Demo = withTrack(provider)(DemoComponent)

    node = document.createElement('div')
    node = document.body.appendChild(node)

    render(<Demo />, node)
  })

  it('Child component renders', () => {
    expect(node.innerHTML).toContain('website-performance-hoc Demo')
  })

  it('track is invoked', () => {
    expect(invoked).toBe(true)
  })

  it('eventname is defaulted to Site.Load', () => {
    expect(name).toBe('Site.Load')
  })

  it('payload isn\'t empty', () => {
    expect(Object(payload).hasOwnProperty('tti')).toBe(true)
  })
})

window.__karma__.loaded = function() {
  window.onload = window.__karma__.start
}
