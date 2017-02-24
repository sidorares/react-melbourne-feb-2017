import React from 'react'
import { ContentSlide, Step } from '../../modules'

const slide = () => (
  <ContentSlide>
    <h3>Inspirations:</h3>
    <ul>
      <Step index={1}>
        <li>
          <a href="https://facebook.github.io/react/contributing/implementation-notes.html">React implementation notes</a> facebook documentation
        </li>
      </Step>
      <Step index={2}>
        <li>
          <a href='http://iamdustan.com/'>{"Dustan Kasten's"}</a> posts and projects, especially
          <a href="https://github.com/iamdustan/tiny-react-renderer"> 'Tiny react renderer'</a>
          <img src="http://iamdustan.com/iamdustan.jpg"
            style={{border:'1px solid #fff', transform: 'rotate(90deg)', marginTop: '0.5rem', width: '3.75rem'}} />
        </li>
      </Step>
      <Step index={3}>
        <li>
        Paul O'Shannessy's talk <a href='https://www.youtube.com/watch?v=_MAD4Oly9yg'>builing React from scratch</a> and
        {" Dustan Kasten's"} <a href='https://www.youtube.com/watch?v=VVxQAoNK_XQ'>talk</a> at 'All things open 2016'
        </li>
      </Step>
      <Step index={4}><li><a href='https://github.com/sidorares/react-x11'>react-x11</a></li></Step>
      <Step index={5}><li>React-native and other non-web react renderers</li></Step>
    </ul>
  </ContentSlide>
)

slide.title = 'intro'

export default slide
