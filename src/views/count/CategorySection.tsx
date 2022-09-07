import styled from "styled-components";
import React, {useState} from "react";
interface categoryProps {
    children?:React.ReactNode;
    value:('-'|'+');
    onChange:(c:('-'|'+'))=>void;
}
const Category = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
    > ul {
      flex-direction: row;
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      justify-content: space-evenly;
      background-color:rgb(246,208,164);
      box-shadow: inset -2px -2px 5px rgba(0, 0, 0, 0.25);
      height: 40px;
      >li{
        width: 50%;
        margin-top: 0px;
        text-align: center;
        font: inherit;
        font-weight: bolder;
        font-size: 20px;
        padding: 10px 0;
        &.selected{
          border-bottom: 3px solid rgb(232,131,147);
          background-color: rgb(246,180,130);
          color: black;
        }
      }
    }
`

const CategorySection:React.FC<categoryProps> = (props) =>{
    const category = props.value;
    const [categoryList] = useState<('-'|'+')[]>(['-','+'])
    const categoryMap = {'-':'支出','+':'收入'}
    return (
        <Category>
            <ul>
                {categoryList.map(c =>
                    <li key={c}
                        className={category === c ? 'selected':''}
                        onClick={() => {props.onChange(c)}}
                    >{categoryMap[c]}
                    </li>
                )}
            </ul>
        </Category>
    );
}
export {CategorySection};