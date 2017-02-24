import React from 'react'
import { TitleSlide } from '../../modules'

const slide = () => (
  <TitleSlide>
    <h1>{slide.title}</h1>
    <h2><i className='fa fa-github' /> <a href='https://github.com/sidorares/react-melbourne-feb-2017'>github.com/sidorares/react-melbourne-feb-2017</a></h2>
  </TitleSlide>
)

slide.title = 'React Internals'

export default slide
