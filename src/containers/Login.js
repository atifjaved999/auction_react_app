import React, { Component } from "react";
import { USER_1, USER_2 } from '../constants/index';

class Login extends Component {

  render(){
    return(
      <div className="outer">
        <div className="middle">
          <div className="inner">
            <button type="button" className="btn btn-secondary" onClick={() => this.props.setCurrentUser(USER_1)}>
              Set User 1
            </button>
            <div className="divider"></div>
            <button type="button" className="btn btn-secondary" onClick={() => this.props.setCurrentUser(USER_2)}>
              Set User 2
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default Login;



