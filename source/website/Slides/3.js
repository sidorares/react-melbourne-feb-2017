import React from 'react'
import { ContentSlide, Step } from '../../modules'

const slide = () => (
  <ContentSlide>
    <h1>{slide.title}</h1>
    <ul>
      <Step index={1}><li>react core is actually quite small</li></Step>
      <Step index={2}><li>If you strip out all sanity checks and cross-browser compatibility it'll probably fit under 1000k lines</li></Step>
      <Step index={3}><li><a href="https://gist.github.com/gaearon/ffd88b0e4f00b22c3159">"Redux without the sanity checks in a single file. Don't use this, use normal Redux"</a></li></Step>
      <Step index={4}><li>There is no gist like ^ for react (I'd like to see one) but <a href='https://github.com/Lucifier129/react-lite'>react-lite</a> is pretty close</li></Step>
    </ul>
  </ContentSlide>
)

slide.title = 'React core api'

export default slide
