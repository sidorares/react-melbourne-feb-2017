const React = require('react')
const Foo = props => <div className='foo'>{props.bar}</div>
const a = <div className='test'><Foo bar={123} /><Foo bar={345} /></div>

const renderToString = ele => {
  if (!ele) {
    return ''
  }
  if (typeof ele.type === 'string') {
    const inner = ele.props.children ? (
      Array.isArray(ele.props.children) ?
        ele.props.children.map(renderToString).join('\n')
        : renderToString(ele.props.children)
    ) : ''

    return (
      `<${ele.type} ${Object.keys(ele.props).map(k => {
        if (k == 'children') return '';
        return k + '=' + ele.props[k]
      }).join(' ')}>`
      + inner + `</${ele.type}>`)
  } else if (typeof ele.type === 'function') {
    const renderedElement = ele.type(ele.props)
    return renderToString(renderedElement)
  }
  return String(ele)
}
console.log(renderToString(a))
