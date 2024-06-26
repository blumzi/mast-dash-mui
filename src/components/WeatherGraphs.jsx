import React from 'react';

class WeatherGraphs extends React.Component {
  render() {
    return (
      <div>
        <iframe
          title="Weather Graphs"
          style={{
            border: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden'
          }}
          allowFullScreen="true"
          src={'http://ocs:physics@10.23.1.25:3000/d/dk8DxsWVz/neot-smadar-weather?orgId=1&refresh=10s'}
        ></iframe>
      </div>
    );
  }
}

export default WeatherGraphs;
