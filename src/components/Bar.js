import React,{useState} from 'react'
import './Bar.css';
function Bar({ index, length, color,changeArray }) {
   
   const [len,setLen]=useState(length)
   
    // const BarStyle = {
    //    height: length,
    // }

    const inputStyle = {
        position: 'relative',
        top: Math.floor(length / 2) - 10,
        width: length,
        left: -Math.floor(length / 2) + 10,
        border: 'none',
        background: 'none',
    }
    const colors = [['rgba(61,90,241,0.5)', 'rgba(61,90,241,0.2)'],
        ['rgba(255,48,79,1)', 'rgba(255,48,79,0.5)'],
        ['rgba(255, 174, 66,1)', 'rgba(255, 174, 66,0.5)'],
    ['rgba(131,232,90,0.5)', 'rgba(131,232,90,0.2)']
    ];

    const front_bottom = {
        transform: `translateY(${200 - length}px) rotateX(-90deg)`,
        backgroundColor: `${colors[color][0]}`,
        boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
        transition: '0.3s'
    }

    const right_left = {
        height: `${length}px`,
        transform: `translateY(${200 - length}px)`,
        backgroundColor: `${colors[color][0]}`,
        boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
        transition: '0.3s'
    }
    const handleChange = (e) => {
        let val = e.target.value
        if (val === '') {
            setLen(0)
            changeArray(index,0)
        }
        else {
            val = parseInt(val);
            if (val > 200) {
                setLen(parseInt(val))
                changeArray(index, 200)
            } else {
                setLen(parseInt(val))
                changeArray(index, val)
            }
            }

    }
    return (<>
        <div className="bar">
            <div className="side top" ></div>
            <div className="side bottom" style={front_bottom}></div>
            <div className="side left">
                <div className="color-bar left-color-bar" style={right_left} ></div>
            </div>
            <div className="side right" >
                <div className="color-bar right-color-bar" style={right_left} ></div>
            </div>
            <div className="side front">
            <div className="color-bar front-color-bar" style={right_left} > <input className="input" type="number" length={length} value={length}
                    style={inputStyle} onChange={handleChange}></input></div>
               
            </div>
            
            <div className="side back">
            <div className="color-bar back-color-bar" style={front_bottom} ></div>
            </div>
            <div className="quantity-nav" >
        </div>
            </div>
        </>
    )
}
export default Bar;