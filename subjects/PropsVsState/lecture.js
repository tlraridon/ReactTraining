import React from 'react'
import ReactDOM from 'react-dom'

class ContentToggle extends React.Component {
  state = {
    isOpen: false
  }

  handleClick() {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (this.props.onToggle)
        this.props.onToggle(this.state.isOpen)
    })
  }

  render() {
    let summaryClassName = 'ContentToggle__Summary'

    if (this.state.isOpen)
      summaryClassName += ' ContentToggle__Summary--is-open'

    return (
      <div {...this.props} className="ContentToggle">
        <button onClick={() => this.handleClick()} className={summaryClassName}>
          {this.props.summary}
        </button>
        <div className="ContentToggle__Details">
          {this.state.isOpen && this.props.children}
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    tacos: [
      { id: 0, name: 'Carnitas', src: 'tacos/carnitas.png' },
      { id: 1, name: 'Pollo', src: 'tacos/pollo.png' },
      { id: 2, name: 'Asada', src: 'tacos/asada.png' }
    ]
  }

  render() {
    return (
      <div>
        <div>
          {this.state.tacos.map((taco) => (
            <ContentToggle
              key={taco.name}
              style={{ width: 300 }}
              summary={taco.name}
            >
              <div
                style={{
                  height: 200,
                  background: `url(${taco.src})`,
                  backgroundSize: 'cover'
                }}
              />
            </ContentToggle>
          ))}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////
// But what about when we add this feature?
// <button>Toggle All</button>

//class ContentToggle extends React.Component {
//  state = { isOpen: this.props.isOpen }
//
//  componentWillReceiveProps(nextProps) {
//    if (nextProps.isOpen != null)
//      this.setState({ isOpen: nextProps.isOpen })
//  }
//
//  handleClick() {
//    this.setState({ isOpen: !this.state.isOpen }, () => {
//      if (this.props.onToggle)
//        this.props.onToggle(this.state.isOpen)
//    })
//  }
//
//  render() {
//    let summaryClassName = "ContentToggle__Summary"
//    if (this.state.isOpen)
//      summaryClassName += " ContentToggle__Summary--is-open"
//    return (
//      <div {...this.props} className="ContentToggle">
//        <button onClick={this.handleClick} className={summaryClassName}>
//          {this.props.summary}
//        </button>
//        <div className="ContentToggle__Details">
//          {this.state.isOpen && this.props.children}
//        </div>
//      </div>
//    )
//  }
//}
//
//class App extends React.Component {
//  state = {
//    allOpen: true,
//    tacos: [
//      { id: 0, name: 'Carnitas', src: 'tacos/carnitas.png' },
//      { id: 1, name: 'Pollo', src: 'tacos/pollo.png' },
//      { id: 2, name: 'Asada', src: 'tacos/asada.png' }
//    ]
//  }
//
//  openAll() {
//    this.setState({ allOpen: true })
//  }
//
//  closeAll() {
//    this.setState({ allOpen: false })
//  }
//
//  render() {
//    return (
//      <div>
//        {this.state.allOpen ? (
//          <button onClick={() => this.closeAll()}>Close All</button>
//        ) : (
//          <button onClick={() => this.openAll()}>Open All</button>
//        )}
//        <div>
//          {this.state.tacos.map((taco) => (
//            <ContentToggle
//              key={taco.name}
//              style={{ width: 300 }}
//              summary={taco.name}
//              isOpen={this.state.allOpen}
//            >
//              <div style={{
//                height: 200,
//                background: `url(${taco.src})`,
//                backgroundSize: 'cover'
//              }}/>
//            </ContentToggle>
//          ))}
//        </div>
//      </div>
//    )
//  }
//}
//
//ReactDOM.render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// This is cool, until we screw up the state by clicking the button, then
// clicking every item to the other state, and then clicking the button again,
// now that the parent owns the toggle state, we need it know each toggler's
// state and synchronize it

//class ContentToggle extends React.Component {
//  state = {
//    isOpen: this.props.isOpen
//  }
//
//  handleClick() {
//    this.setState({ isOpen: !this.state.isOpen }, () => {
//      if (this.props.onToggle)
//        this.props.onToggle(this.state.isOpen)
//    })
//  }
//
//  componentWillReceiveProps(nextProps) {
//    this.setState({ isOpen: nextProps.isOpen })
//  }
//
//  render() {
//    let summaryClassName = "ContentToggle__Summary"
//    if (this.state.isOpen)
//      summaryClassName += " ContentToggle__Summary--is-open"
//    return (
//      <div {...this.props} className="ContentToggle">
//        <button onClick={() => this.handleClick()} className={summaryClassName}>
//          {this.props.summary}
//        </button>
//        <div className="ContentToggle__Details">
//          {this.state.isOpen && this.props.children}
//        </div>
//      </div>
//    )
//  }
//}
//
//class App extends React.Component {
//  state = {
//    tacos: [
//      { name: 'Carnitas', src: 'tacos/carnitas.png', isOpen: false },
//      { name: 'Pollo', src: 'tacos/pollo.png', isOpen: false },
//      { name: 'Asada', src: 'tacos/asada.png', isOpen: false }
//    ]
//  }
//
//  openAll() {
//    this.setState({
//      tacos: this.state.tacos.map(taco => {
//        taco.isOpen = true
//        return taco
//      })
//    })
//  }
//
//  closeAll() {
//    this.setState({
//      tacos: this.state.tacos.map(taco => {
//        taco.isOpen = false
//        return taco
//      })
//    })
//  }
//
//  handleTacoToggle(toggledTaco, isOpen) {
//    this.setState({
//      tacos: this.state.tacos.map(taco => {
//        if (taco.name === toggledTaco.name)
//          taco.isOpen = isOpen
//        return taco
//      })
//    })
//  }
//
//  render() {
//    const shouldCloseAll = this.state.tacos.every(taco => taco.isOpen)
//    return (
//      <div>
//        {shouldCloseAll ? (
//          <button onClick={() => this.closeAll()}>Close All</button>
//        ) : (
//          <button onClick={() => this.openAll()}>Open All</button>
//        )}
//        <div>
//          {this.state.tacos.map(taco => (
//            <ContentToggle
//              key={taco.name}
//              style={{ width: 300 }}
//              summary={taco.name}
//              isOpen={taco.isOpen}
//              onToggle={isOpen => this.handleTacoToggle(taco, isOpen)}
//            >
//              <div style={{
//                height: 200,
//                background: `url(${taco.src})`,
//                backgroundSize: 'cover'
//              }}/>
//            </ContentToggle>
//          ))}
//        </div>
//      </div>
//    )
//  }
//}
//
//ReactDOM.render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Our state is now fully synchronized, but do we even need state in
// ContentToggle anymore?

//class ContentToggle extends React.Component {
//  handleClick() {
//    if (this.props.onToggle)
//      this.props.onToggle(!this.props.isOpen)
//  }
//
//  render() {
//    let summaryClassName = "ContentToggle__Summary"
//    if (this.props.isOpen)
//      summaryClassName += " ContentToggle__Summary--is-open"
//    return (
//      <div {...this.props} className="ContentToggle">
//        <button onClick={() => this.handleClick()} className={summaryClassName}>
//          {this.props.summary}
//        </button>
//        <div className="ContentToggle__Details">
//          {this.props.isOpen && this.props.children}
//        </div>
//      </div>
//    )
//  }
//}

////////////////////////////////////////////////////////////////////////////////
// - We didn't really get rid of state, we just pushed it up a level
// - got rid of synchronizing state :)
// - component is super simple, just a function of its props
//
// But its not as portable anymore
// - Must implement `onToggle` :\
// - Must manage state in the owner, always :\

// We can create a controlled component that wraps our pure component.

//class StatefulContentToggle extends React.Component {
//  state = { isOpen: false }
//
//  render() {
//    return <ContentToggle
//      {...this.props}
//      isOpen={this.state.isOpen}
//      onToggle={isOpen => this.setState({ isOpen })}
//    />
//  }
//}
//
//ReactDOM.render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// You don't inherit from base classes, you compose by wrapping, just like you
// compose functions, call one inside of another
