import {useEffect, useRef, useState} from "react";
import {createId} from "../lib/createId";
const useTags =() => {
    const [Tags, setTags] = useState<{ id:number;name:string;category:('+'|'-');iconId:number}[]>([]);
        useEffect(()=>{
            let localTags = JSON.parse(window.localStorage.getItem('tags')||'[]')
            if(localTags.length === 0){
                localTags = [
                    {id:createId(),name:'餐饮',category:'-',iconId:0},
                    {id:createId(),name:'房租',category:'-',iconId:1},
                    {id:createId(),name:'服装',category:'-',iconId:2},
                    {id:createId(),name:'娱乐',category:'-',iconId:3},
                    {id:createId(),name:'旅行',category:'-',iconId:4},
                    {id:createId(),name:'美容',category:'-',iconId:5},
                    {id:createId(),name:'汽车',category:'-',iconId:6},
                    {id:createId(),name:'饮品',category:'-',iconId:7},
                    {id:createId(),name:'宠物',category:'-',iconId:8},
                    {id:createId(),name:'购物',category:'-',iconId:9},
                    {id:createId(),name:'度假',category:'-',iconId:10},
                    {id:createId(),name:'医疗',category:'-',iconId:11},
                    {id:createId(),name:'工资',category:'+',iconId:12},
                    {id:createId(),name:'奖金',category:'+',iconId:13},
                    {id:createId(),name:'兼职',category:'+',iconId:14},
                    {id:createId(),name:'投资',category:'+',iconId:15},
                    {id:createId(),name:'转账',category:'+',iconId:16},
                ]
            }
            setTags(localTags)
        },[])
    const count = useRef(0);
    useEffect(() =>{
        count.current += 1;
        }
    )
    useEffect(()=>{
        if(count.current > 1){
            window.localStorage.setItem('tags',JSON.stringify(Tags))
        }
    },[Tags])
    const IconMap:{id:number;name:string}[] =[
        {id:0,name:'餐饮'},
        {id:1,name:'房租'},
        {id:2,name:'服装'},
        {id:3,name:'娱乐'},
        {id:4,name:'旅行'},
        {id:5,name:'美容'},
        {id:6,name:'汽车'},
        {id:7,name:'饮品'},
        {id:8,name:'宠物'},
        {id:9,name:'购物'},
        {id:10,name:'度假'},
        {id:11,name:'医疗'},
        {id:12,name:'薪水'},
        {id:13,name:'奖金'},
        {id:14,name:'兼职'},
        {id:15,name:'投资'},
        {id:16 ,name:'收款'}
    ];
    const findTag = (id:number) => Tags.filter(tag => tag.id === id)[0];
    const findTagIndex = (id:number) => {
        let result = -1;
        for(let i=0; i<Tags.length; i++) {
            if(Tags[i].id === id){
                result = i;
                break;
            }
        }
        return result;
    }
    const updateTag = (id:number,iconId:number,obj:{name:string;category:('+'|'-')}) => {
        setTags(Tags.map(tag => {
            if(tag.id === id){
                return {id:id,name:obj.name,category:obj.category,iconId:iconId};
            }else {
                return tag;
            }
        }))
    }
    const deleteTag = (id:number) => {
        setTags(Tags.filter(tag=>tag.id !== id))
    }
    const addTag = (name:string, iconId:number, category:'-'|'+') => {
        setTags([...Tags,{id:createId(),name:name,category:category,iconId:iconId}]);
    }
    const getName = (id:number) => {
        const tag = Tags.filter(tag=>tag.id===id)[0]
        if(tag){
            return tag.name
        }else {
            return ''
        }
    }
    return{tags: Tags,IconMap,getName,setTags,addPayTag: addTag,updateTag,findTag,findTagIndex,deleteTag}
}
export {useTags};