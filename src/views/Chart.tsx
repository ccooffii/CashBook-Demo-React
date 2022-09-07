import Layout from "../components/Layout";
import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts'
import styled from "styled-components";
import {RecordItem, useRecords} from "../hooks/useRecords";
import {useDate} from "../hooks/useDate";
import {TopBar} from "./AddTag";
import {useTags} from "../hooks/useTags";
import _ from 'lodash'
import day from 'dayjs'
import {CategorySelectBox} from "./RecordsEdit";
const TableBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  >div{
      >h3{
        display: flex;
        justify-content: space-between;
        padding-bottom: 5px;
        border-bottom: 2px solid black;
        margin-top: 5px;
        margin-left: 5px;
        margin-right: 5px;
        line-height: 40px;
        height: 40px;
        overflow: hidden;
        >span{
          overflow: hidden;
        }
      }
  }
`
const OverViewBox = styled.div`
  border: 2px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  height: 100px;
  >div{
    height: 50px;
  }
`
const  LineBox = styled.div`
  border: 2px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  height: 30vh;
  >div{
    height: 150px;
    width: 100%;
  }
`
const PieBox = styled.div`
  border: 2px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  height: 30vh;
  >div{
    height: 150px;
    width: 100%;
  }
`
const MyTopBar = styled(TopBar)`
    display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  font-size: 20px;
`
function Chart() {
    const line = useRef<any>(null)
    const bar = useRef<any>(null)
    const pie = useRef<any>(null)
    const [category,setCategory] = useState<('-'|'+')>('-')
    const [categoryList] = useState<('-'|'+')[]>(['-','+'])
    const [newCategory,setNewCategory] = useState<('-'|'+')>('-')
    const [newCategoryList] = useState<('-'|'+')[]>(['-','+'])
    const {findDay} = useDate()
    const {records} = useRecords()
    const {getName} = useTags()
    const today = new Date()
    const payArray = []
    const incomeArray = []
    for(let i=0;i<7;i++){
        const date = findDay(day(today).subtract(i,'day').toISOString())
        payArray.push({
            date:date,
            value:_.filter(records,{
                createdAt:date,
                category:'-'
            }).map(record=>{
                return record.amount
            }).reduce((sum,item)=>{
                return sum + item
            },0)
        })
    }
    for(let i=0;i<7;i++){
        const date = findDay(day(today).subtract(i,'day').toISOString())
        incomeArray.push({
            date:date,
            value:_.filter(records,{
                createdAt:date,
                category:'+'
            }).map(record=>{
                return record.amount
            }).reduce((sum,item)=>{
                return sum + item
            },0)
        })
    }
    const payHashTag: {[tag:string]:number} = {};
    records.map(record => {
        if(record.category==='-') {
            let key = getName(record.tagId)
            if(!(key in payHashTag)){
                payHashTag[key] = 0
            }
            payHashTag[key] += record.amount
        }
    })
    const piePayData:any = []
    let tempArr1 = Object.keys(payHashTag)
    let tempArr2 = Object.values(payHashTag)
    for(let i=0;i <tempArr1.length;i++){
        piePayData.push({
            name:tempArr1[i],
            value:tempArr2[i]
        })
    }
    const incomeHashTag: {[tag:string]:number} = {};
    records.map(record => {
        if(record.category==='+') {
            let key = getName(record.tagId)
            if(!(key in incomeHashTag)){
                incomeHashTag[key] = 0
            }
            incomeHashTag[key] += record.amount
        }
    })
    let tempArr3 = Object.keys(incomeHashTag)
    let tempArr4 = Object.values(incomeHashTag)
    const pieIncomeData:any = []
    for(let i=0;i <tempArr3.length;i++){
        pieIncomeData.push({
            name:tempArr3[i],
            value:tempArr4[i]
        })
    }
    const weekCost:number = payArray.reduce((sum:number,item)=>{
      return  sum + item.value
    },0)
    const weekIncome:number = incomeArray.reduce((sum:number,item)=>{
        return  sum + item.value
    },0)
    payArray.sort((a,b)=>{
        if(a.date>b.date) {
            return 1
        }else if(a.date === b.date){
            return 0
        }else {
            return -1
        }
    })
    incomeArray.sort((a,b)=>{
        if(a.date>b.date) {
            return 1
        }else if(a.date === b.date){
            return 0
        }else {
            return -1
        }
    })
    const payLineKey = payArray.map(item=>item.date)
    const payLineValue = payArray.map(item=>item.value)
    const incomeLineKey = incomeArray.map(item=>item.date)
    const incomeLineValue = incomeArray.map(item=>item.value)
    const linePayOption = {
        grid:{
                left:0,
                right:0,
                top:10,
                bottom:20,
        },
        xAxis: {
            type: 'category',
                data: payLineKey,
                axisTick:{
                alignWithLabel:true,
            },
            axisLabel:{
                formatter:function (value:string,index:number){
                    return value.substr(5)
                }
            }
        },
        yAxis: {
            type: 'value',
                show:false,
        },
        tooltip:{
            show:true,
                triggerOn:'click'
        },
        series: [
            {
                symbolSize:12,
                symbol: 'circle',
                data: payLineValue,
                type: 'line',
                color:'rgb(232,131,147)',
                itemStyle: {
                    normal: {
                        color: "rgb(246,208,110)",
                        lineStyle: {
                            color: "rgb(232,131,147)"
                        }
                    },
                }
            },
        ]
    }
    const lineIncomeOption = {
        xAxis: {
            data: incomeLineKey,
        },
        series: [
            {
                data: incomeLineValue,
            }
        ]
    }
    const piePayOption = {
        tooltip:{
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 5,
            top:'middle',
            itemWidth:5,
            itemHeight:5,
            itemGap:2,
        },
        series: [
            {
                name: '收支分析',
                type: 'pie',
                radius: '60%',
                data: piePayData,
                label:{
                    position:'outside'
                },
                labelLine:{
                    length:10,
                    length2:10,
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                left:'30%',
                top:'5%'
            }
        ]
    }
    const pieIncomeOption = {series: [{data: pieIncomeData,}]}
    useEffect(()=>{
        let lineChart = echarts.init(line.current)
        let barChart = echarts.init(bar.current)
        let pieChart = echarts.init(pie.current)
        if(category==='-'){
            lineChart.setOption(linePayOption)
        }else if(category==='+'){
            lineChart.setOption(lineIncomeOption)
        }
        if(newCategory==='-'){
            pieChart.setOption(piePayOption)
        }else if(newCategory==='+'){
            pieChart.setOption(pieIncomeOption)
        }
        barChart.setOption({
                grid: {
                    top:0,
                    left:10,
                    right:50,
                    bottom:0,
                },
                xAxis: {
                    type: 'value',
                    show:false,
                },
                yAxis: {
                    type: 'category',
                    show:false,
                },
                series: [
                    {
                        type: 'bar',
                        data: [weekIncome],
                        barGap:0,
                        barWidth:20,
                        color:'rgb(246,209,105)',
                        label:{
                            show:true,
                            position:`right`,
                        }
                    },
                    {
                        type: 'bar',
                        data: [weekCost],
                        barWidth:20,
                        barGap:0,
                        color:'rgb(232,131,147)',
                        label:{
                            show:true,
                            position:`right`,
                        }
                    },

                ]
        })
    })
    return (
        <Layout>
            <MyTopBar>
               分析
            </MyTopBar>
            <TableBox>
                <OverViewBox>
                    <h3>近七天收支情况: <span>{(weekIncome-weekCost)>0?'收入:￥'+(weekIncome-weekCost):'消费:￥'+-(weekIncome-weekCost)}</span></h3>
                    <div ref={bar}></div>
                </OverViewBox>
                <LineBox>
                    <h3>近七天收支趋势:
                        <CategorySelectBox>
                            {categoryList.map(_category=>
                                <li key = {_category}
                                    className={_category === category ? 'selected':''}
                                    onClick={()=> {
                                        setCategory(_category)
                                    }}
                                >{_category==='-'?'支出':'收入'}
                                </li>
                            )}
                        </CategorySelectBox>
                    </h3>
                    <div ref={line}></div>
                </LineBox>
                <PieBox>
                    <h3>
                        近七天收支分析:
                        <CategorySelectBox>
                            {newCategoryList.map(__category=>
                                <li key = {__category}
                                    className={__category === newCategory ? 'selected':''}
                                    onClick={()=> {
                                        setNewCategory(__category)
                                    }}
                                >{__category==='-'?'支出':'收入'}
                                </li>
                            )}
                        </CategorySelectBox>
                    </h3>
                    <div ref={pie}></div>
                </PieBox>
            </TableBox>
        </Layout>
    );
}
export default Chart;