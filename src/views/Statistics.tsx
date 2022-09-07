import Layout from "../components/Layout";
import React from "react";
import styled from "styled-components";
import {RecordItem, useRecords} from "../hooks/useRecords";
import {useTags} from "../hooks/useTags";
import Icon from "../components/Icon";
import {useDate} from "../hooks/useDate";
import {Link} from "react-router-dom";
const StatisticsLayOut = styled(Layout)`
>header{
  background-color:rgb(246,208,164);
  height: 40px;
  box-shadow: inset -2px -2px 5px rgba(0, 0, 0, 0.25);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  font-size: 20px;
  margin-bottom: 10px;
}
  >ul{
    display: flex;
    flex-direction: column;
    padding-left: 8px;
    padding-right: 8px;
    overflow-y: scroll;
    flex-grow: 1;
    margin-bottom: 10px;
    >.date{
      display: flex;
      align-items: end;
      justify-content: space-between;
      border-left: 4px solid rgb(246,209,105);
      border-radius: 2px;
      margin-bottom: 3px;
      padding-left: 3px;
      padding-right: 3px;
      color: #777;
      >span{
        color: #777;
        font-size: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    >li{
      >a {
        box-shadow: inset -2px -3px 0px rgba(0,0,0,0.25);
        background-color:rgb(254,251,240) ;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        width: 100%;
        margin-bottom: 4px;
        z-index: 2;
        border: 1px solid black;
        > .name {
          display: flex;
          flex-direction: row;
          margin-right: 30vw;
          align-items: center;
          margin-left: 7px;

          > div {
            display: flex;
            flex-direction: column;
            margin-left: 5px;

            > .note {
              color: #777;
              font-size: 10px;
            }
          }

          > svg {
            height: 30px;
            width: 30px;
            margin-right: 5px;
          }
        }

        > .amount {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin-right: 7px;

          > .money {
            font-weight: bold;
            color: #555;
            font-size: 12px;
          }
        }
      }
    }
    
  }
`
const Statistics=()=> {
    const {records} = useRecords()
    const {IconMap,getName,findTag} = useTags()
    const {findToday,findDay} = useDate()
    const hashDay : {[date:string]:RecordItem[]} = {};
    records.map(record => {
        const key = findDay(record.createdAt)
        if(!(key in hashDay)){
            hashDay[key] = []
        }
        hashDay[key].push(record)
    })
    const array: [string,RecordItem[]][] = Object.entries(hashDay).sort((a,b)=>{
        if (a[0]===b[0]) return 0
        if(a[0]<b[0]) return 1
        if(a[0]>b[0]) return -1
        return 0
    })
    const getAmount = (findDate:string) =>{
        let amount:number = 0
        array.map(([date,records])=>{
            if (date === findDate){
                records.map(record=>{
                    if(record.category==='+'){
                        amount += record.amount
                    }else if(record.category==='-'){
                        amount -= record.amount
                    }
                })
            }
        })
        return amount;
    }
    return (
        <StatisticsLayOut>
            <header>
                收支明细
            </header>
            {array.map(([date,records])=>
                <ul key={date}>
                <div className="date">
                    <span>
                        {date+'  '}{findToday(date)}
                    </span>
                    <span>
                        {getAmount(date)>=0?'收入:'+'￥' + getAmount(date):'支出:'+'￥' + -getAmount(date)}
                    </span>
                </div>
                {records.map(record => {
                    return <li key={record.recordId}>
                        <Link to={'/recordsEdit/'+record.recordId}>
                        <div className="name">
                            <Icon name={IconMap[findTag(record.tagId).iconId].name||'猫猫'}></Icon>
                            <div>
                                <span>{getName(record.tagId)}</span>
                                <span className='note'>{record.note}</span>
                            </div>
                        </div>
                        <div className="amount">
                            <span>{record.category==='-'?'支出':'收入'}</span>
                            <span className="money">￥{record.amount}</span>
                        </div>
                        </Link>
                    </li>
                })}
            </ul>)}
        </StatisticsLayOut>
    );
}
export default Statistics;