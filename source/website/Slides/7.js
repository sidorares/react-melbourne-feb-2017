import React from 'react'
import { ContentSlide, Step, Code } from '../../modules'

const slide = () => (
  <ContentSlide>
    <h1>{slide.title}</h1>
    <ul>
      <Step index={1}>
        <li>Is a plain object</li>
      </Step>
      <Step index={2}>
        <li>stores reference to it's 'attributes' in props, also child elements there as well</li>
      </Step>
      <Step index={3}>
        <li>Main building block in React: All components always "return" / render one single element.
          Also entry point to start rendering - you pass single element to <code>ReactDOM.render()</code> at the beginning
        </li>
      </Step>
    </ul>
  </ContentSlide>
)

slide.title = 'React Element'

export default slide
