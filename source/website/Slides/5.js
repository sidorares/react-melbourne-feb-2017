import React from 'react'
import { ContentSlide, Step, Code } from '../../modules'

const slide = () => (
  <ContentSlide>
    <h1>{slide.title}</h1>
    <Step index={1}><pre style={{margin: 'auto'}}>(input data, ui state) => view</pre></Step>
    <div style={{margin: '1em'}}>
      <Step index={2} exact><Code value={`
const data = {counter: 0}
ReactDOM.render(
  React.createElement(Application, data)
  document.getElementById('container')
)
      `} /></Step>
      <Step index={3} exact><Code value={`
const data = {counter: 0}
const Application = (props) =>
  React.createElement('div', null, data.counter)
const render = () => {
  ReactDOM.render(
    React.createElement(Application, data)
    document.getElementById('container')
  )
}
render()
document.addEventListener('click',
  () => { data.counter++; render() }
)
      `}/></Step>
      <Step index={4} exact>
        <div>
          <h3>hard re-render</h3>
          <Code value={`
const data = {counter: 0}
const Application = (props) => \`<div>\${props.counter}</div>\`
const render = () => {
  document
    .getElementById('container')
    .innerHTML = Application(data)
}
render()
document.addEventListener('click',
  () => { data.counter++; render() }
)
        `}/>
        </div>
      </Step>
      <Step index={5} exact>
        <div>
          <h3>manual update</h3>
          <Code value={`
const data = {counter: 0}
const render = () => {
  document.getElementById('container div').innerText = data.counter
}
render()
document.addEventListener('click',
  () => { data.counter++; render() }
)
          `}/>
        </div>
      </Step>

    </div>
  </ContentSlide>
)

slide.title = 'React core api'

export default slide
