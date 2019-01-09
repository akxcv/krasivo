import React from 'react'
import ReactDOM from 'react-dom'
import krasivo from 'krasivo'
import styled, { css } from 'styled-components'
import { Picker } from 'emoji-mart'
import _ from 'lodash'

import 'emoji-mart/css/emoji-mart.css'
import './patches.css'
import registerServiceWorker from './registerServiceWorker'

const Wrapper = styled.div`
  font-family: 'Noto Sans', 'sans-serif';
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;

  input {
    font-size: 16px;
    padding: 3px 7px;
    border-radius: 3px;
    border: 1px solid #ccc;
    margin-bottom: 15px;
    color: #333;
  }

  h1,
  h2 {
    font-family: 'Noto Serif', 'serif';
    margin: 15px 0;
  }
  h1 {
    font-size: 30px;
  }
  h2 {
    display: inline-block;
    margin: 0;
    font-size: 20px;
  }
`

const Header = styled.div`
  margin: 20px 0 5px 0;
  font-size: 20px;
  position: relative;
  white-space: nowrap;
  ${props =>
    props.error
      ? css`
          color: #d0180b;
        `
      : css`
          line-height: 16px;
          letter-spacing: -2px;
        `};
`

const Copy = styled.div`
  margin-top: 20px;
`

const Settings = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`

const Setting = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
  width: 338px;
`

const Muted = styled.div`
  font-style: italic;
  color: #666;
  font-size: 12px;
  margin-top: -20px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;

  select,
  input {
    margin-left: 10px;
  }
`

class App extends React.Component {
  state = {
    text: 'krasivo',
    fg: ':art:',
    bg: ':dark_sunglasses:',
    skinTone: null,
    shortEmoji: true
  }

  componentDidMount () {
    this.setPreviewFontSize()
    window.addEventListener('resize', this.setPreviewFontSize)

    const text = decodeURIComponent(window.location.hash.slice(1))
    if (text.length > 0) {
      this.setText(text)
    }
  }

  handleChange = e => {
    const { name, type, checked, value } = e.target

    if (name === 'text') {
      this.setText(value)
    } else {
      const isCheckbox = type === 'checkbox'
      this.setState({
        [name]: isCheckbox ? checked : value
      })
    }
  }

  setText = text => {
    this.setState({ text }, () => {
      this.updateLocationHash()
      this.setPreviewFontSize()
    })
  }

  copy = () => {
    this.textarea.select()
    document.execCommand('Copy')
  }

  setPreviewFontSize = () => {
    const symbolCount = this.previewRef.firstChild.innerText.length
    const windowWidth = document.body.getBoundingClientRect().width
    const fontSize = Math.min(windowWidth / symbolCount / 0.5, 20)
    const lineHeight = fontSize * 0.8
    this.previewRef.style.fontSize = `${fontSize}px`
    this.previewRef.style.lineHeight = `${lineHeight}px`
  }

  updateLocationHash = _.debounce(() => {
    window.location.hash = `#${encodeURIComponent(this.state.text)}`
  }, 200)

  render() {
    let prettyText,
      error = false
    try {
      prettyText = krasivo(this.state.text, this.state.fg, this.state.bg, {
        shortEmoji: this.state.shortEmoji,
        skinTone: this.state.skinTone
      })
    } catch (e) {
      prettyText = e.message
      error = true
    }
    return (
      <Wrapper>
        <Header error={error}>
          <span ref={ref => this.previewRef = ref}>
            {prettyText
              .split('\n')
              .map((line, index) => <div key={index}>{line}</div>)}
          </span>
          {!error && (
            <Copy>
              <button onClick={this.copy}>Copy to clipboard</button>
            </Copy>
          )}
        </Header>
        <Setting>
          <h1>Text</h1>
          <input
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
        </Setting>
        <Settings>
          <Setting>
            <h1>Foreground</h1>
            <input
              type="text"
              name="fg"
              value={this.state.fg}
              onChange={this.handleChange}
            />
            <Picker
              emoji={this.state.fg.slice(1, -1)}
              skin={this.state.skinTone || 1}
              onClick={emoji => this.setState({ fg: `:${emoji.id}:` })}
            />
          </Setting>
          <Setting>
            <h1>Background</h1>
            <input
              type="text"
              name="bg"
              value={this.state.bg}
              onChange={this.handleChange}
            />
            <Picker
              emoji={this.state.bg.slice(1, -1)}
              skin={this.state.skinTone || 1}
              onClick={emoji => this.setState({ bg: `:${emoji.id}:` })}
            />
          </Setting>
          <Setting>
            <h1>Misc</h1>
            <Row>
              <h2>Skin tone</h2>
              <select
                name="skinTone"
                value={this.state.skinTone || ''}
                onChange={this.handleChange}
              >
                <option value={null}>None</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
            </Row>
            <Row>
              <h2>Short emoji</h2>
              <input
                type="checkbox"
                name="shortEmoji"
                checked={this.state.shortEmoji}
                onChange={this.handleChange}
                style={{ margin: '0 0 0 10px' }}
              />
            </Row>
            <Muted>Convert emoji names to Unicode emoji</Muted>
          </Setting>
        </Settings>
        <textarea
          style={{ opacity: 0, pointerEvents: 'none' }}
          ref={ref => (this.textarea = ref)}
          value={prettyText}
          readOnly
        />
      </Wrapper>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker()
