import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import './InputGroup.css';

class InputGroup extends Component {

  constructor() {
    super();
    this.submitHandler = this.submitHandler.bind(this);
  }
  
  submitHandler(e) {
    e.preventDefault();
    const txt = this.refs.longUrlInput.value;
    if(txt) {
      this.props.shortenUrl(txt);
    }
  }

  componentWillMount() {
    console.log( 'componentWillMount() called.' );
  }

  componentWillReceiveProps(nextProps) {
    console.log( 'componentWillReceiveProps() called.' );
  }
 
  render() {
    const data = this.props.urls;
    console.log( 'URLS:'+JSON.stringify(data) );
    return (
      <div className="input-group-wrapper">
        <h1>URL Shortener</h1>
        <div className="row">      
          <div className="col-lg-12">
            <div className="input-group input-group-lg">
              <input id="url-field"
                type="text"
                ref='longUrlInput'
                className="form-control" 
                placeholder="Paste a link..." />
                
              <span className="input-group-btn">
                <button className="btn btn-shorten" onClick={this.submitHandler} type="button">SHORTEN</button>
              </span>
            </div> 
          </div>
        </div>
        { this.props.urls.urls.shortUrl && <a href={this.props.urls.urls.shortUrl} className="alert-link">{this.props.urls.urls.shortUrl}</a>}
        { this.props.urls.urls.msg && <Alert bsStyle="primary">{this.props.urls.urls.msg}</Alert>}
        { this.props.urls.urls.error && <Alert bsStyle="danger">{this.props.urls.urls.error}</Alert>}
      </div>
    );
  }
}

InputGroup.propTypes = {
  urls: PropTypes.object.isRequired,
  shortenUrl: PropTypes.func.isRequired
}

export default InputGroup;
