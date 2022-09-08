import {useTags} from "hooks/useTags";
import {Link, useParams} from "react-router-dom";
import React from "react";
import Icon from "../components/Icon";
import styled from "styled-components";
import {TopBar} from "./AddTag";
export type Params = {
    id:any
}
export const EditWrapper = styled.div`
  font-weight: bolder;
  display: flex;
  flex-direction: column;
  background-color:rgb(254,251,240) ;
  height: 100vh;
  user-select: text;
  >label{
    display: flex;
    height: 100px;
    text-align: center;
    flex-direction: row;
    align-items: center;
    padding-right: 15px;
    padding-left: 15px;
    flex-wrap: nowrap;
    font-size: 20px;
    background-color: rgb(246,208,164);
    border:1.5px solid black;
    margin-right: 50px;
    margin-left: 50px;
    margin-top: 30px;
    border-radius: 10px;
    box-shadow: inset -2px -2px 0px rgba(0,0,0,0.25);
    >input{
      font-size: inherit;
      overflow-x: hidden;
      height: 100%;
      margin-right: 5px;
      margin-left: 5px;
      background: none;
      border:none;
      max-width: 50%;
      user-select: text;
      -webkit-user-select: text;
    }
  }
  >div{
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }
`
export const AddButton = styled.button`
  background-color: rgba(232,130,148,0.7);
  padding: 8px;
  border-radius: 14px;
  color: white;
  font-weight: bolder;
  text-align: center;
  width: 100px;
  height: 50px;
  font-size: 20px;
  border:none;
  box-shadow: inset -2px -3px 0px rgba(0,0,0,0.25);
`
export const DeleteButton = styled.button`
  background-color: rgba(232,50,40,0.7);
  border:none;
  padding: 8px;
  border-radius: 14px;
  color: white;
  font-weight: bolder;
  width: 100px;
  height: 50px;
  font-size: 20px;
  text-align: center;
  box-shadow: inset -2px -3px 0px rgba(0,0,0,0.25);
`
export const PayTagEdit: React.FC = () => {
    const {findTag, updateTag, deleteTag} = useTags();
    let {id} = useParams<Params>();
    const tag = findTag(parseInt(id));
    let tempValue: string;
    if (tag) {
        return (
            <EditWrapper>
                <TopBar>
                    <Link to='/PayTagsSettings'><Icon name='return'></Icon></Link>
                    <span>编辑标签 - {tag.name}</span>
                </TopBar>
                <label>
                    <span>修改标签名:</span>
                    <input type="text" placeholder="输入标签名"
                           onChange={(e) => {
                               tempValue = e.target.value
                               // console.log(1)
                           }}
                    />
                </label>
                <div>
                    <AddButton onClick={() => {
                        if (tempValue === tag.name || tempValue == '') {
                            window.alert('请输入新的标签名')
                        } else {
                            window.alert('修改成功')
                            updateTag(tag.id, tag.iconId,{name: tempValue, category: '-'})
                        }
                    }}>确定修改</AddButton>
                    <DeleteButton onClick={() => {
                        deleteTag(tag.id)
                        window.location.assign('./')
                    }}>删除标签</DeleteButton>
                </div>
            </EditWrapper>
        )
    } else {
        return (
            <EditWrapper>
                <TopBar>
                    <Link to='/PayTagsSettings'><Icon name='return'></Icon></Link>
                    <span>你要找的标签丢了</span>
                </TopBar>
            </EditWrapper>
        )
    }
}