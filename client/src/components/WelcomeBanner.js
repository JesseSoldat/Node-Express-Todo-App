import React from 'react';

const WelcomeBanner = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      {props.subtitle && <h5>{props.subtitle}</h5>}
    </div>
  );
}

WelcomeBanner.defaultProps = {
  title: 'Welcome'
}

export default WelcomeBanner;