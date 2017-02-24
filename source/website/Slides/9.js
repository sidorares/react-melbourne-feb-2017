import React from 'react'
import { ContentSlide, Step, Code } from '../../modules'


const slide = ({stepIndex}) => (
  <ContentSlide>
    <h1>{slide.title}</h1>
    <img style={{width: '90%'}} src='https://www.evernote.com/shard/s32/res/2030ab0e-42ea-4d27-9527-eb8a0570af4f' />
  </ContentSlide>
)

slide.title = 'HostComponents & PublicInstance & PrivateInstance & Owner Element'

export default slide
