import React, { Component } from 'react';
import Bar from './components/Bar.js';
//CSS
import './app.css'
//icons
import Play from '@material-ui/icons/PlayArrowRounded';
import Forward from '@material-ui/icons/SkipNextRounded';
import Backward from '@material-ui/icons/SkipPreviousRounded';
import Rotate from '@material-ui/icons/RotateLeft';
//Algorithms
import BubbleSort from './algorithms/BS';


class App extends Component {

  state = {
      arr:[],
      arrSteps:[],
      delay: 200,
      count: 15,
      algorithm: 'Bubble Sort',
    timeouts: [],
    currentStep: 0,
    colorSteps:[],
    colorKey: [],
      color:[],
    };
  componentDidMount(){
  this.generateRandomArray();
  }


  ALGORITHMS = {
    'Bubble Sort': BubbleSort,
}
  
  clearColorKey = () => {
    let blankKey=new Array(this.state.count).fill(0);
    this.setState({
      colorKey: blankKey,
      colorSteps:[blankKey]
    })
  }
  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.setState({
      timeouts: []
    });
  };
  generateRandomNumber = (min, max) => {
    
    return Math.floor(Math.random() * (max - min) + min);
  };

  generateRandomArray = () => {
    this.clearTimeouts();
    this.clearColorKey();
    const count = this.state.count;
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push(this.generateRandomNumber(10, 200));
    }
    this.setState({
      arr: temp,
      arrSteps: [temp],
      currentStep: 0,
    }, () => {
      this.generateSteps();
    });
  };

  changeArray = (index, value) => {
    let array = this.state.arr;
    array[index] = value;
    this.setState({
      arr: array,
      arrSteps: [array],
      currentSteps: 0
    }, () => {
      this.generateSteps();
    });
  };

  generateSteps = () => {
    let array = this.state.arr.slice();
    let steps = this.state.arrSteps.slice();
    let colorSteps = this.state.colorSteps.slice();
    console.log(array);
    this.ALGORITHMS[this.state.algorithm](array, 0, steps, colorSteps);
    this.setState({
      arrSteps: steps,
      colorSteps: colorSteps
  })
  };

  prevStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep === 0) {
      return;
    }
    currentStep -= 1;
    this.setState({
      currentStep: currentStep,
      arr: this.state.arrSteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
    })
}
nextStep = () => {
  let currentStep = this.state.currentStep;
  if (currentStep === this.state.arrSteps.length - 1) {
    return;
  }
  else {
    currentStep += 1;
    this.setState({
      currentStep: currentStep,
      arr: this.state.arrSteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
    });
  }
}

  start = () => {
    this.clearTimeouts();
    let steps = this.state.arrSteps;
    let colorSteps = this.state.colorSteps;
    let timeouts = [];

    let i = 0;

    while (i < steps.length - this.state.currentStep) {
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep;
        this.setState({
          arr: steps[currentStep],
          colorKey: colorSteps[currentStep],
          currentStep: currentStep + 1,
        });
        timeouts.push(timeout);
      }, this.state.delay * i);
      i++;
    }
  }

  render() {
    let bars = this.state.arr.map((value, index) => (
      <Bar Key={index}
        index={index}
        length={value}
        color={this.state.colorKey[index]}
        changeArray={this.changeArray}
      />
    ));

    let playButtom;
    if (this.state.arrSteps.length === this.state.currentStep) {
      playButtom = (
        <button className="Controller"  onClick={this.generateRandomArray}>
            <Rotate/>
        </button>
      )
    } else {
      playButtom = (
        <button className="Controller" onClick={this.start}>
            <Play/>
        </button>
      )
    }

    return (
      <div>
        <div className="frame">
          <div className="barsDiv container card">{bars}</div>
        </div>
        <div className="Control-panel">
          <div className="Control-buttons">
          <button className="Controller" onClick={this.prevStep}>
            <Backward/>
        </button>
            {playButtom}
            <button className="Controller" onClick={this.nextStep}>
            <Forward/>
        </button>
          </div>
        </div>
        <div className="Panel"></div>
      </div>
    )
  }
}
export default App;
