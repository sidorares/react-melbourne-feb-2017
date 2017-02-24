import React from 'react'
import { ContentSlide, Step, Code } from '../../modules'


const slide = ({stepIndex}) => (
  <ContentSlide>
    <h1>{slide.title}</h1>
    <h1>+ Demos</h1>
  </ContentSlide>
)

slide.title = 'Mountng / Updates / Unmounting'

export default slide
