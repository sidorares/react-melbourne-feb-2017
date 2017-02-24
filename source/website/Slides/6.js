import React from 'react'
import { ContentSlide, Step, Code } from '../../modules'

const slide = () => (
  <ContentSlide>
    <h1>{slide.title}</h1>
    <div style={{margin: '1em'}}>
      <h3>what is actually is in <code>a</code> after this line is executed?</h3>
      <Step index={0} exact><Code value={`
const a = <div className='test'>foobar</div>
      `} /></Step>
      <Step index={1} exact><Code value={`
$ babel-node
> const a = <div className='test'>foobar</div>
undefined
> a
{ '$$typeof': Symbol(react.element),
  type: 'div',
  key: null,
  ref: null,
  props: { className: 'test', children: 'foobar' },
  _owner: null,
  _store: {} }
>
      `} /></Step>
      <Step index={2} exact><Code value={`
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
    </div>
  </ContentSlide>
)

slide.title = 'React Element'

export default slide
