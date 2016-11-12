import React, { Component} from 'react'

export default class RedditNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ['hot','new','rising','controversial','top'],
      selected: null
    }
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    this.setState({selected: e.currentTarget.textContent});
    this.props.changeType(e.currentTarget.textContent);
  }

  render() {
    return (
      <div className="navbar">
        <ul className="horizontal-nav">
          {
            this.state.options.map((val, i) => {
              if(this.state.selected === val) {
                return ( <li className="nav-item-selected" key={i} onClick={this.onClick}>{val}</li>)
              }
              return ( <li className="nav-item" key={i} onClick={this.onClick}>{val}</li>)
            })
          }
        </ul>
      </div>
    )
  }
}
