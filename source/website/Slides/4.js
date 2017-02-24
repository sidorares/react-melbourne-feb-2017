import React from 'react'
import { ContentSlide, Step } from '../../modules'
import TweetEmbed from 'react-tweet-embed'

const slide = () => (
  <ContentSlide>
    <h1>{slide.title}</h1>
    <div><TweetEmbed id='827706179027562496' /></div>
  </ContentSlide>
)

slide.title = 'React core api'

export default slide
