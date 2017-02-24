import React from 'react'
import { Code, ContentSlide, Step } from '../../modules'

/*
const code = require('raw!../../../examples/render-function.js')
const dimLines = {
  3: [[0, 1], [5, 6]]
}
const highlightLines = {
  4: [[0, 0], [2, 2]]
}
*/

const slide = ({ stepIndex }) => (
  <ContentSlide>
    <h1>{slide.title}</h1>
    <ul>
      <Step index={1}>
        <li>React core vs non-core (react-web etc, aka "renderers")</li>
      </Step>
      <Step index={2}>
        <li>react terminology - classes vs components vs elements, HostComponents, InternalInstance / PublicInstance etc; Reconciling, Mounting, Updates</li>
      </Step>
      <Step index={3}>
        <li>we'll try to build super simple react renderer</li>
      </Step>
      <Step index={4}>
        <li>some non-ReactWeb demos - react-hardware and react-blessed</li>
      </Step>
      <Step index={5}>
        <li>If enough time - code patterns used in react source (Transaction, Injections, Object pools) and How React-Devtools work</li>
      </Step>
    </ul>
  </ContentSlide>
)

slide.title = 'what I want to cover today'

export default slide
