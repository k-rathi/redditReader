import React, { Component} from 'react'

export default class Subreddits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputAdd: '',
      inputRemove: ''
    };
  }
  onAdd(e) {
    e.preventDefault();
    if(this.state.inputAdd !== '') {
      this.props.onAdd(this.state.inputAdd);
      this.setState({inputAdd: ''});
    }
  }
  onRemove(e) {
    e.preventDefault();
    if(this.state.inputRemove !== '') {
      this.props.onRemove(this.state.inputRemove);
      this.setState({inputRemove: ''});
    }
  }

  render() {
    const {value} = this.props;
    return (
      <div>
        <div className="center">
          <h1>{`r/${value}`}</h1>
        </div>
        <div className="picker">
          <div>
            <form className="row-form" onSubmit={e => this.onAdd(e)}>
              <div className="row-title"> Add Subreddit </div>
              <input className="row-form-input" value={this.state.inputAdd} onChange={e => this.setState({inputAdd: e.target.value})}/>
            </form>
          </div>
          <div>
            <form className="row-form" onSubmit={e => this.onRemove(e)}>
              <div className="row-title"> Remove Subreddit </div>
              <input className="row-form-input"value={this.state.inputRemove} onChange={e => this.setState({inputRemove: e.target.value})}/>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
