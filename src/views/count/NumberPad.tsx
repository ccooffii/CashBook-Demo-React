import styled from "styled-components";
import React, {useState} from "react";
import {generateOutput} from "./NumberPadSection/generateOutput";
interface padProps {
    children?:React.ReactNode;
    noteValue:string;
    noteValueOnChange: (value: string)=>void;
    padValue:number;
    padValueOnChange:(padValue:number) => void;
    onOK?:()=>void;
}
const NumberPad = styled.section`
  display: flex;
  flex-direction: column;
  background-color: rgb(246,209,105);
  border-top: 2px solid black;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  font-weight: bolder;
  margin-right: 0.5px;
  overflow-x: hidden;
  width: 100vw;
    >.note{
      overflow-x: hidden;
      overflow-y: hidden;
      margin-top: 5px;
      display: flex;
      height: 36px;
      text-align: center;
      flex-direction: row;
      align-items: center;
      padding-right: 15px;
      padding-left: 15px;
      flex-wrap: nowrap;
      font-size: 20px;
      user-select: text;
      -webkit-user-select: text;
      >input{
        overflow-x: hidden;
        height: 100%;
        margin-right: 5px;
        margin-left: 5px;
        background: none;
        border:none;
        max-width: 30%;
        user-select: text;
        -webkit-user-select: text;
      }
      .output{

        overflow-x: hidden;
        width: auto;
        line-height: 72px;
      }
    }
  >.clearfix::after{
    content: "";
    display: block;
    clear:both;

    overflow-x: hidden;
  }
  >.pad{
    padding-left: 1%;
    overflow-x: hidden;
    > button{
      background-color: rgb(255,255,255);
      box-shadow: inset -1px -3px 0px rgba(0,0,0,0.25);
      border-radius: 10px;
      border: 2px solid black;
      margin-right: 1%;
      margin-bottom: 1%;
      font-size: 18px;
      float:left;
      width: 24%;
      height: 56px;
      font-weight: bolder;  
      &.OK{
        height: 116px;
        float: right;
        background-color: rgb(232,130,148);
        color:white;
      }
      &.dot{
        width: 49%;
      }
    }
  }
`
const NumberPadSection: React.FC<padProps> = (props) => {
    let note = props.noteValue;
    const [output,_setOutput] = useState(props.padValue.toString());
    let tempOutput:string;
    const setOutput = (output:string) => {
        if(output.length > 12){
            tempOutput = output.slice(0,12)
        }else if (output.length === 0){
            tempOutput = '0';
        }else{
            tempOutput = output;
        }
        _setOutput(tempOutput)
       props.padValueOnChange(parseFloat(tempOutput));
    };
    const onClickNumberPad = (e:React.MouseEvent) => {
        const text = (e.target as HTMLButtonElement).textContent;
        if (text === null) {return;}
        if (text === 'OK') {
            if (props.onOK) {props.onOK();
            _setOutput('0')
            }
            return;
        }
        if ('0123456789.'.split('').concat(['DELETE', 'CLEAR']).indexOf(text) >= 0) {
            setOutput(generateOutput(text, output));
        }
    }
    return (
        <NumberPad>
            <div className="note">
                备注:
                <input placeholder="添加备注" type="text"
                       value = {note}
                       onChange={(e) => props.noteValueOnChange(e.target.value)}
                />
                $:
                <div className="output">
                    {output}
                </div>
            </div>
                <div className="pad clearfix" onClick={onClickNumberPad}>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>DELETE</button>
                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                    <button>CLEAR</button>
                    <button>7</button>
                    <button>8</button>
                    <button>9</button>
                    <button className="OK">OK</button>
                    <button>0</button>
                    <button className="dot">.</button>
                </div>
        </NumberPad>
);
}
export {NumberPadSection};