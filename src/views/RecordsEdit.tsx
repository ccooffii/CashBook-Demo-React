import {Link, useParams} from "react-router-dom";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import styled from "styled-components";
import {TopBar} from "./AddTag";
import Icon from "../components/Icon";
import {useRecords} from "../hooks/useRecords";
import {useTags} from "../hooks/useTags";
import {useDate} from "../hooks/useDate";
import {AddButton, DeleteButton} from "./PayTagEdit";
import {set} from "lodash";
type Params = {
    id:any
}
const RecordBox = styled.div`
  display: flex;
  flex-direction: column;
  height:100vh;
  background-color: rgb(254,251,240);
  user-select: text;
  -webkit-user-select: text;
  >header{
    font-weight: bolder;
  }
`
export const CategorySelectBox = styled.ul`
    display: flex;
    >li{
      margin-right: 10px;
      color: darkgrey;
    }
    .selected{
      color:black;
      border-bottom: 2px solid rgb(246,50,50);
    }
`
const RecordInfoBox = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 10px 20px;
  user-select: text;
  -webkit-user-select: text;
  >div{
    padding: 5px 0px;
    display: flex;
    border-bottom: 1px solid black;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    overflow: hidden;
    user-select: text;
    -webkit-user-select: text;
    >span{
      margin-right: 10px;
      margin-left: 10px;
      >svg{
        height: 20px;
        width: 20px;
      }
    }
    >ul{
      display: flex;
      >li{
        margin-right: 10px;
        color: darkgrey;
      }
      .selected{
        color:black;
        border-bottom: 1.5px solid rgb(246,50,50);
      }
    }
    >input{
      background: none;
      user-select: text;
      -webkit-user-select: text;
      border: none;
      width: 30%;
      text-align: right;
      margin-right: 10px;
    }
  }
`
const ButtonBox = styled.div`
  margin-top: 100px;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  >button{
    width: 30%;
    border: none;
    color: white;
    font-size: 18px;
    font-weight: bolder;
    &.delete{
      background-color: rgb(239,112,100);
      box-shadow: inset -2px -3px 0px rgba(0,0,0,0.25);
    }
    &.edit{
      background-color: rgb(239,167,175);
      box-shadow: inset -2px -3px 0px rgba(0,0,0,0.25);
    }
  }
`
export const RecordsEdit:React.FC = () => {
    const {id} = useParams<Params>();
    const {getName,findTag,IconMap} = useTags();
    const {findRecord,deleteRecord,updateRecord} = useRecords()
    const {findDay} = useDate()
    let record = findRecord(parseInt(id))
    const [category,setCategory] = useState<('-'|'+')>('-')
    const [categoryList] = useState<('-'|'+')[]>(['-','+'])
    const [newAmount,setNewAmount] = useState(0)
    const [newNote,setNewNote] = useState('')
    const count = useRef(0);
    useEffect(() => {
        count.current += 1;
    })
    useEffect(()=>{
        if(count.current>1){
            setNewAmount(record.amount)
            setCategory(record.category)
            setNewNote(record.note)
        }
    },[record])
    const submit = () => {
        if(newAmount === 0){
            window.alert('?????????????????????')
            return;
        }else if(category!=='-'&&category!=='+') {
            window.alert('?????????????????????')
        }else {
            updateRecord(record.recordId,category,newAmount,newNote)
            window.alert('????????????')
        }
    }
    if(record){
        return(
        <RecordBox>
            <TopBar>
                <Link to='/statistics'><Icon name='return'></Icon></Link>
                <span>????????????</span>
            </TopBar>
            <RecordInfoBox>
                <div>
                    <span>
                        {getName(record.tagId)}
                    </span>
                    <span>
                        <Icon name={IconMap[findTag(record.tagId).iconId].name}/>
                    </span>
                </div>
                <div>
                    <span>??????</span>
                    <CategorySelectBox>
                        {categoryList.map(_category=>
                            <li key = {_category}
                                className={_category === category ? 'selected':''}
                                onClick={()=>setCategory(_category)}
                            >{_category==='-'?'??????':'??????'}
                            </li>
                        )}
                    </CategorySelectBox>
                </div>
                <div>
                    <span>??????</span>
                    <input
                            placeholder={newAmount.toString()}
                            value={newAmount}
                            onClick={(e)=>{
                                e.currentTarget.selectionStart=e.currentTarget.selectionEnd=e.currentTarget.value.length
                            }}
                            onChange={(e)=>{
                                    let value = e.target.value.replace(/[^\d]/g,'')
                                    if(value===''){
                                        setNewAmount(0)
                                    }else{
                                        setNewAmount(parseInt(value))
                                    }
                                }
                            }
                    />
                </div>
                <div>
                    <span>??????</span><span> {findDay(record.createdAt)}</span>
                </div>
                <div>
                    <span>??????</span>
                    <input
                        placeholder={record.note===''?'????????????':record.note}
                        onChange={(e)=> {setNewNote(e.target.value)
                        }}
                    />
                </div>
            </RecordInfoBox>
            <ButtonBox>
                <AddButton
                    onClick={()=>submit()}
                >
                    ????????????
                </AddButton>
                <DeleteButton
                    onClick={()=>{
                        deleteRecord(record.recordId);
                        window.location.assign('./')
                        }
                    }
                >
                    ????????????
                </DeleteButton>
            </ButtonBox>
        </RecordBox>
    )
    }else{
        return (
            <div>
                404 NOT FOUND
            </div>
        )
    }
}