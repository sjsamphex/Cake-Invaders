import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";

class Facebook extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userId: "",
      name: "",
      email: "",
      picture: "",
    };
  }

  // responseFacebook = (response) => console.log(response);

  responseFacebook(response) {
    // this.setState({
    //   marker: arr,
    // });
    console.log(response);
  }

  componentClicked() {
    console.log("clicked");
  }

  render() {
    let fbContent;
    if (this.state.isLoggedIn) {
      fbContent = null;
    } else {
      fbContent = (
        <FacebookLogin
          appId="459306878548339"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }
    return <div>{fbContent}</div>;
  }
}

export default Facebook;
