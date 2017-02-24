import React from 'react'
import { ContentSlide, Step, Code } from '../../modules'

const code1 = require('raw!../../../examples/render-to-string1.js')

// style={{border: 'solid red 1px'}}
//{ props.count > 0 <RecursiveComponent count={props.count - 1} /> : null }
const RecursiveComponent = props => (
  <div style={{border: 'solid red 1px'}}>
    { props.count > 0 ? <RecursiveComponent count={props.count - 1} /> : null }
    <div style={{fontSize: '5px'}}>{"recursive:" + props.count}</div>
  </div>
)

const slide = ({stepIndex}) => (
  <ContentSlide>
    <h1>{slide.title}</h1>
    <div>
    <Step index={1} exact><Code value={`
$ babel-node
> const Foo = props => <div className='foo'>{props.bar}</div>
> const a = <div className='test'><Foo bar={123} /></div>
undefined
> a
{ '$$typeof': Symbol(react.element),
type: 'div',
key: null,
ref: null,
props:
 { className: 'test',
   children:
    { '$$typeof': Symbol(react.element),
      type: [Function: Foo],
      key: null,
      ref: null,
      props: [Object],
      _owner: null,
      _store: {} } },
_owner: null,
_store: {} }
   `} /></Step>
     <Step index={2} exact><Code value={code1} /></Step>
     <Step index={3} exact>
       <div>
         <h3>Are we allowed to have something like this in React?</h3>
<Code value={`
  const MyFancyComponent = (props) => (
    <div>
       {// ... more stuff }
       <MyFancyComponent {...someExtraProps}/>
       {// ... more stuff }
    </div>
   )
`} />
      </div>
     </Step>
     <Step index={4} exact>
       <div>
        <h3>Are we allowed to have something like this in React?</h3>
        <img src='/static/recursion.png' style={{matgin: 'auto', width: '80%'}}/>
      </div>
     </Step>

    <Step index={6}>
      <Code value={`
const RecursiveComponent = props => (
  <div style={{border: 'solid red 1px'}}>
    { props.count > 0 ?
      <RecursiveComponent count={props.count - 1}/>
      : null
    }
    {"recursive:" + props.count}
  </div>
 )
      `} />
     </Step>
     <Step index={7}>
       <div>
         <pre>{`<RecursiveComponent count={ ${stepIndex} } />`}</pre>
         <RecursiveComponent count={stepIndex} />
       </div>
     </Step>
     <Step index={12}><div /></Step>
    </div>
  </ContentSlide>
)

slide.title = 'Reconciliation'

export default slide
