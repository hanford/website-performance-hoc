import React, {Component} from 'react'
import {render} from 'react-dom'

import withTrack from '../../src'

class Demo extends Component {
  render () {
    return (
      <div>
        <h1>website-performance-hoc Demo</h1>
      </div>
    )
  }
}

const HasTrack = withTrack()(Demo)

render(<HasTrack />, document.querySelector('#demo'))
