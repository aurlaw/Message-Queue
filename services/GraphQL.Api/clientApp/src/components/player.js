import React, { Component } from 'react';

import './player.css';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tilted: false,
          }        
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle() {
        this.setState((prevState, props) => {
            return {tilted: !prevState.tilted};
          })        
    }


    render() {
        var detailsClass = this.state.tilted ? "details" : "";
        return (
            <div className={detailsClass}>
                <div className="card" onClick={() => this.handleToggle()}>
                    <div className="photo"></div>
                    <h2>{this.props.name}</h2>
                    <p>{this.props.birthPlace}</p>
                    <div className="chart">
                        <div className="bar bar1"><span>20,000</span></div>
                        <div className="bar bar2"><span>10,000</span></div>
                        <div className="bar bar3"><span>15,000</span></div>
                        <div className="bar bar4"><span>24,000</span></div>
                        <div className="bar bar5"><span>7,000</span></div>
                    </div>
                </div>
            </div>            
        )
    }
}

export default Player;

/*
  .details .card .bar.bar1 {
    height: 150px;
    transition-delay: 0.3s;
    margin-top: -150px;
  }

*/