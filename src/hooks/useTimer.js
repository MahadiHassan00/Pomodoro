import { useState, useEffect, useCallback } from 'react';

export function useTimer({ onComplete }) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' or 'break'
  const [cycles, setCycles] = useState(0);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    if (mode === 'work') {
      setMinutes(25);
    } else {
      setMinutes(5);
    }
    setSeconds(0);
  }, [mode]);

  const switchMode = useCallback(() => {
    setIsActive(false);
    if (mode === 'work') {
      setMode('break');
      setMinutes(5);
    } else {
      setMode('work');
      setMinutes(25);
    }
    setSeconds(0);
  }, [mode]);

  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            const nextMode = mode === 'work' ? 'break' : 'work';
            const nextMinutes = nextMode === 'work' ? 25 : 5;
            
            setMode(nextMode);
            setMinutes(nextMinutes);
            setSeconds(0);
            
            // Play notification sound
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj2n7v/TdxkAM6Lq/+hvFwAooOX/72oVACKd4f/sZhIAHJre/+hiEAAXl9r/5F4NABOu1P/hWwsAD6vQ/95XCQALp8z/2lMHAAajyP/XTwUAApK9/85LAwAAj7j/y0cBAABqrf/IRAAAQZW6/8VBAAAY0+3/wT4AAA3D4v++OgAABbPV/7o3AAABqMr/tzMAAAAzk/+0MAAA///9/7EtAAD///X/rioAAP//7v+rJwAA//+Z/58kAAD//4z/nCEAAP//5v+ZHAAA///g/5YZAAD//9j/kxYAAP//z/+QFAAA//+k/4cRAAD//5z/hA4AAP//lP+BCwAA//+M/38JAAD//4X/fAYAAP//f/95BAAA//94/3cBAAD//3L/dQAAAP//bf9zAAAA//9q/3EAAAD//2b/bwAAAP//ZP9tAAAA//9h/2sAAAD//17/aQAAAP//XP9nAAAA//9a/2UAAAD//1n/ZAAAAP//Vv9iAAAA//9V/2EAAAD//1P/XwAAAP//Uf9dAAAA//9P/1wAAAD//07/WgAAAP//TP9YAAAA//9L/1cAAAD//0r/VQAAAP//SP9UAAAA//9I/1MAAAD//0f/UQAAAP//Rf9QAAAA//9E/04AAAD//0L/TQAAAP//Qf9LAAAA//9A/0oAAAD//0D/SQAAAP//P/9HAAAA//8+/0YAAAD//z3/RQAAAP//PP9EAAAA//87/0MAAAD//zr/QgAAAP//O/9AAAAA//86/z8AAAD//zj/PgAAAP//N/89AAAA//82/zwAAAD//zb/OwAAAP//Nf86AAAA//81/zkAAAD//zT/OAAAAP//M/83AAAA//8z/zYAAAD//zP/NQAAAP//Mv80AAAA//8y/zMAAAP//zH/MgAAAP//MP8xAAAA//8w/zAAAAD//y//LwAAAP//L/8uAAAA//8v/y0AAAD//y7/LAAAAP//Lf8rAAAA//8t/yoAAAD//y3/KgAAAP//LP8pAAAA//8s/ygAAAD//yv/JwAAAP//K/8mAAAA//8q/yUAAAD//yr/JQAAAP//Kv8kAAAA//8p/yMAAAD//yn/IwAAAP//Kf8iAAAA//8o/yEAAAD//yj/IQAAAP//KP8gAAAA//8n/x8AAAD//yf/HwAAAP//J/8eAAAA//8m/x0AAAD//yb/HQAAAP//Jv8cAAAA//8l/xsAAAD//yX/GwAAAP//Jf8aAAAA//8l/xoAAAD//yX/GQAAAP//JP8YAAAA//8k/xgAAAD//yP/FwAAAP//I/8XAAAA//8j/xYAAAD//yP/FgAAAP//I/8VAAAA//8i/xUAAAD//yL/FAAAAP//Iv8UAAAA//8i/xMAAAD//yL/EwAAAP//If8SAAAA//8h/xIAAAD//yH/EQAAAP//If8RAAAA//8h/xEAAAD//yD/EAAAAP//IP8QAAAA//8g/w8AAAD//yD/DwAAAP//IP8PAAAA//8g/w4AAAD//x//DgAAAP//H/8OAAAA//8f/w0AAAD//x//DQAAAP//H/8NAAAA//8f/wwAAAD//x7/DAAAAP//Hv8MAAAA//8e/wsAAAD//x7/CwAAAP//Hv8LAAAA//8e/woAAAD//x3/CgAAAP//Hf8KAAAA//8d/woAAAD//x3/CQAAAP//Hf8JAAAA//8d/wkAAAD//x3/CAAAAP//HP8IAAAA//8c/wgAAAD//xz/CAAAAP//HP8IAAAA//8c/wcAAAD//xz/BwAAAP//HP8HAAAA//8c/wcAAAD//xv/BgAAAP//G/8GAAAA//8b/wYAAAD//xv/BgAAAP//G/8GAAAA//8b/wUAAAD//xv/BQAAACgARAAA');
            audio.play();
            
            // Update cycles and handle task completion
            if (nextMode === 'work') {
              setCycles(prev => prev + 1);
              
              // Call the onComplete callback to handle task completion
              if (mode === 'work' && onComplete) {
                onComplete();
              }
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, mode, onComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (min, sec) => {
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return {
    minutes,
    seconds,
    isActive,
    mode,
    cycles,
    toggleTimer,
    resetTimer,
    switchMode,
    formatTime
  };
}