
import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Icon from "../components/Icon";
import {useTags} from "../hooks/useTags";
import {TopBar} from "./AddTag";
export const AddTagBar = styled.button`
  position: fixed;
  top: 80vh;
  left:50%;
  background-color: rgba(232,130,148,0.7);
  border:none;
  font-size: 18px;
  padding: 8px;
  transform: translateX(-50%);
  border-radius: 14px;
  z-index: 3;
  color: white;
  font-weight: bolder;
  box-shadow: inset -2px -3px 0px rgba(0,0,0,0.25);
`
export const Container = styled.div`
  font-weight: bolder;
  display: flex;
  flex-direction: column;
  background-color:rgb(254,251,240) ;
  height: 100vh;
`
export const TagsList = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 8px;
  padding-right: 8px;
  overflow-y: scroll;
  flex-grow: 1;
  >li{
    flex-shrink: 0;
    background-color:rgb(254,251,240) ;
    border-radius: 5px;
    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;
    margin-bottom: 4px;
    z-index: 2;
    border: 1px solid black;
    >a{
      flex-shrink: 0;
      box-shadow: inset -2px -3px 0px rgba(0,0,0,0.25);
      background-color:rgb(254,251,240) ;
      border-radius: 5px;
      display: flex;
      align-items: center;
      height: 40px;
      width: 100%;
      flex-direction: row;
      //padding: 10px;
      justify-content: space-between;
      z-index: 2;
      svg{
        height: 30px;
        width: 30px;
      }
      >*{
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
  >.hide{
    display: none;
  }
`
function PayTagsSettings(){
    const {tags,IconMap} = useTags();
    return (
        <Container>
            <TopBar>
                <Link to='/count'>
                    <Icon name='return'/>
                </Link>
                <span>标签列表</span>
            </TopBar>
            <TagsList>
                {tags.map(tag=>
                    <li key={tag.id} className={tag.category==='-'?'':'hide'}>
                        <Link to={'/PayTagsSettings/'+tag.id}>
                            <Icon name={IconMap[tag.iconId].name||'猫猫'}/>
                            <span>{tag.name}{' '+'>'}</span>
                        </Link>
                    </li>
                )}
            </TagsList>
            <Link to='/addTag'>
                <AddTagBar>新增标签</AddTagBar>
            </Link>
        </Container>
    )
}
export default  PayTagsSettings;