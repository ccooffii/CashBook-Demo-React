import React from "react";
import {Link} from "react-router-dom";
import Icon from "../components/Icon";
import {useTags} from "../hooks/useTags";
import {AddTagBar, Container, TagsList} from "./PayTagsSettings";
import {TopBar} from "./AddTag";
export function IncomeTagsSettings(){
    const {tags,IconMap} = useTags();
    return(
        <Container>
            <TopBar>
                <Link to='/count'>
                    <Icon name='return'/>
                </Link>
                <span>标签列表</span>
            </TopBar>
            <TagsList>
                {tags.map(tag=>
                    <li key={tag.id} className={tag.category==='+'?'':'hide'}>
                        <Link to={'/IncomeTagsSettings/'+tag.id}>
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