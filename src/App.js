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
import SelectionSort from './algorithms/SS';
import QuickSort from './algorithms/QS';
import InsertionSort from './algorithms/IS';

class App extends Component {

  state = {
      arr:[],
      arrSteps:[],
      delay: 150,
      count: 30,
      algorithm: 'Bubble Sort',
    timeouts: [],
    currentStep: 0,
    colorSteps:[],
    colorKey: [],
    color: [],
    BsSelec: true,
    SsSelec: false,
    IsSelec: false,
    QsSelec: false,
    };
  componentDidMount(){
  this.generateRandomArray();
  }


  ALGORITHMS = {
    'Bubble Sort': BubbleSort,
    'Selection Sort': SelectionSort,
    'Insertion Sort': InsertionSort,
    'Quick Sort':  QuickSort,
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
      temp.push(this.generateRandomNumber(25, 200));
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

  changeArrayCount = (e) => {
    this.setState({
      count: e.target.radius,
    });
    this.generateRandomArray();
  }
  generateSteps = () => {
    let array = this.state.arr.slice();
    let steps = this.state.arrSteps.slice();
    let colorSteps = this.state.colorSteps.slice();
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
  changeAlgotoBS = () => {
    this.setState({
      algorithm: 'Bubble Sort',
      BsSelec: true,
      SsSelec: false,
      IsSelec: false,
      QsSelec: false,
    });

    this.generateRandomArray();
  }

  changeAlgotoQS = () => {
    this.setState({
      algorithm: 'Quick Sort',
      BsSelec: false,
      SsSelec: false,
      IsSelec: false,
      QsSelec: true,
    });
    this.generateRandomArray();
  }
  changeAlgotoSS = () => {
    this.setState({
      algorithm: 'Selection Sort',
      BsSelec: false,
      SsSelec: true,
      IsSelec: false,
      QsSelec: false,
    });
    this.generateRandomArray();
  }
  changeAlgotoIS = () => {
    this.setState({
      algorithm: 'Insertion Sort',
      BsSelec: false,
      SsSelec: false,
      IsSelec: true,
      QsSelec: false,
    });
    this.generateRandomArray();
  }
  render() {
    let bars = this.state.arr.map((value, index) => (
      <Bar Key={index}
        index={index}
        length={value}
        color={this.state.colorKey[index]}
        changeArray={this.changeArray}
        algorithm={this.state.algorithm}
      />
    ));

    let playButtom;
    if (this.state.arrSteps.length === this.state.currentStep) {
      playButtom = (
        <button className="Controller" onClick={this.generateRandomArray}>
          <Rotate style={{ color: "white" }} />
        </button>
      )
    } else {
      playButtom = (
        <button className="Controller" onClick={this.start}>
          <Play style={{ color: "white" }} />
        </button>
      )
    }
    const bss = this.state.BsSelec;
    const sss = this.state.SsSelec;
    const iss = this.state.IsSelec;
    const qss = this.state.QsSelec;
    {console.log(bss ? "selected" : "NOooooooooo")
    };

    return (
      <div> 
         
        <div className="Panel">
          
          <ul className="Sorts">
          <li><a href="#" className = { bss? "selected" : null} onClick={this.changeAlgotoBS} >BubbleSort</a></li>
          <li ><a href="#"  className = { sss ? "selected" : null} onClick={this.changeAlgotoSS}>Selection Sort</a></li>
          <li ><a href="#"  className = {iss ? "selected" : null}onClick={this.changeAlgotoIS} >Insertion Sort</a></li>
          <li ><a  href="#" className = { qss ? "selected" : null} onClick={this.changeAlgotoQS} >Quick Sort</a></li>
        </ul></div>


        <div className="frame">
          <div className="barsDiv container card">{bars}</div>
        </div>
        
        
        <div className="Control-panel">
          <div className="Control-buttons">
          <button className="Controller" onClick={this.prevStep}>
            <Backward style={{ color: "white" }}/>
        </button>
            {playButtom}
            <button className="Controller" onClick={this.nextStep}>
            <Forward style={{ color: "white" }}/>
        </button>
          </div>
        </div>
      </div>
    )
  }
}
export default App;
