import React from "react";
import Navi from "./Navi";
import styled from "styled-components";
const Wrapper = styled.div`
  border: 1px solid grey;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: rgb(254,251,240);
  
`
const Main = styled.div`
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
`

const Layout = (props : any) => {
    return (
    <div>
        <Wrapper>
                <Main className={props.className}>
                    {props.children}
                </Main>
            <Navi/>
        </Wrapper>
    </div>
    )
}

export  default Layout;