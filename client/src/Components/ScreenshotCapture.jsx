import React, { Component } from 'react';
import axios from 'axios';

class WebsiteScreenshot extends Component {
  state = {
    screenshotUrl: null,
    error: null,
  }; 

  componentDidMount() {
    const { websiteUrl, apiKey } = this.props;

    if (websiteUrl && apiKey) {
      this.captureScreenshot(websiteUrl, apiKey);
    }
  }

  captureScreenshot = (websiteUrl, apiKey) => {
    const apiUrl = `https://api.screenshotmachine.com?key=${'b286f1'}&url=${encodeURIComponent(websiteUrl)}`;

    axios
      .get(apiUrl)
      .then((response) => {
        // Check if the response data is valid and not empty
        if (response.data) {
          this.setState({ screenshotUrl: response.data });
        } else {
          this.setState({ error: 'Screenshot data is empty or undefined' });
        }
      })
      .catch((error) => {
        console.error('Error capturing screenshot:', error);
        this.setState({ error: 'An error occurred while capturing the screenshot' });
      });
  };

  render() {
    const { screenshotUrl, error } = this.state;

    return (
      <div>
        {error ? (
          <p>{error}</p>
        ) : screenshotUrl ? (
          <img src={screenshotUrl} alt="Website Screenshot" />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default WebsiteScreenshot;
