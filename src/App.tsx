import * as React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`

interface AppPropsType {}
interface AppStateType {}

class App extends React.Component<AppPropsType, AppStateType> {
  public render() {
    return (
      <Wrapper>
        <Title>Just a Test</Title>
      </Wrapper>
    )
  }
}

export default App
