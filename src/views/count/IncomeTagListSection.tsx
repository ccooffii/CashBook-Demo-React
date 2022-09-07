
import React from "react";
import Icon from "../../components/Icon";
import {Link} from "react-router-dom";
import classnames from 'classnames';
import {TagListSection} from "./PayTagListSection";
import {useTags} from "../../hooks/useTags";

interface IncomeTagProps {
    children?:React.ReactNode | React.ReactNode[];
    value:number;
    onChange: (selected:number) => void;
}
const IncomeTagListSection: React.FC<IncomeTagProps> = (props:IncomeTagProps) => {
    const selectedTagId = props.value;
    const onToggleTag = (tagId:number) => {
        if (selectedTagId === tagId){
            props.onChange(0);
        }else {
            props.onChange(tagId)
        }
    }
    const {tags,IconMap} = useTags();
    return(
        <TagListSection>
            <div>
                {tags.map(tag=>
                    <li key={tag.id} onClick={() => {onToggleTag(tag.id)}}
                        className={classnames(tag.category==='+'?'':'hidden',
                            selectedTagId===tag.id? 'selected': '')}
                    >
                        <Icon name={IconMap[tag.iconId].name||'猫猫'}/>
                        {tag.name}
                    </li>
                )}
                <Link to='/IncomeTagsSettings'>
                    <Icon name="设置"/>设置
                </Link>
            </div>
        </TagListSection>
    );
}
export {IncomeTagListSection};
