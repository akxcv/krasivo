import React from 'react'
import ReactDOM from 'react-dom'
import krasivo from 'krasivo'
import styled, { css } from 'styled-components'
import { Picker } from 'emoji-mart'

import 'emoji-mart/css/emoji-mart.css'
import './patches.css'
import registerServiceWorker from './registerServiceWorker'

const Wrapper = styled.div`
  font-family: 'Noto Sans', 'sans-serif';
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    font-size: 16px;
    padding: 3px 7px;
    border-radius: 9px;
    border: 1px solid #ccc;
    margin-bottom: 25px;
  }

  h1,
  h2,
  h3 {
    font-family: 'Noto Serif', 'serif';
  }
  h3 {
    display: inline-block;
    margin: 0;
  }
`

const Header = styled.div`
  margin: 100px 0 50px 0;
  font-size: 20px;
  position: relative;
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
`

const Setting = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 30px;
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

  handleChange = e => {
    const isCheckbox = e.target.type === 'checkbox'
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value
    })
  }

  copy = () => {
    this.textarea.select()
    document.execCommand('Copy')
  }

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
          {prettyText.split('\n').map((line, index) => <div key={index}>{line}</div>)}
          {!error && (
            <Copy>
              <button onClick={this.copy}>Copy to clipboard</button>
            </Copy>
          )}
        </Header>
        <h1>Settings</h1>
        <Setting>
          <h2>Text</h2>
          <input
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
        </Setting>
        <Settings>
          <Setting>
            <h2>Foreground</h2>
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
            <h2>Background</h2>
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
            <h2>Misc</h2>
            <Row>
              <h3>Skin tone</h3>
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
              <h3>Short emoji</h3>
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
