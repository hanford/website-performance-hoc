# website-performance-hoc

[![npm package][npm-badge]][npm]

Wrap react components with a HOC measuring page performance metrics. This packages assumes you're tracking via segment and is simply providing a react-y HOC implementation of the [website-performance](https://github.com/hanford/website-performance) npm module.

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

## Usage

If you've loaded segment globally, and are guranteed to have window.analytics defined before your code runs .. integrating is as easy as:
```js
import withPerformance from 'website-performance-hoc'

class MyPage extends React.PureComponent {
  ...
}

export default withPerformance(window.analytics)(MyPage, { eventName: 'Performance.Track' })
```

In other cases, you may have asynchronously loaded a tracking library. Integrating would then look something like this:

```js
import withPerformance from 'website-performance-hoc'
import Segment from 'load-segment'
const analytics = Segment({ key: .. })

class MyPage extends React.PureComponent {
  ...
}

export default withPerformance(analytics)(MyPage)
```

`website-performance-hoc` can take any analytics provider as long as it has a `.track()` method, so it should work with Google analytics and Segment. If you're using an analytics provider that doesn't have a `.track()` method, please [open an issue](https://github.com/hanford/website-performance-hoc/issues/new).

We're using `componentDidMount` in the `HOC` which can be invoked before the `DOM` has loaded. In that case, we set `window.onload` to retry tracking once the window has loaded. We're also deferring the track call to when the browser has free cycles using [request-callback](https://github.com/hanford/request-callback).


Questions? Feedback? [Please let me know](https://github.com/hanford/website-performance-hoc/issues/new)

## License (MIT)

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```
Copyright © 2017-present [Jack Hanford](http://jackhanford.com), jackhanford@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
