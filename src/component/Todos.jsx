import React from 'react'
import styled from 'styled-components'
import {MdDeleteForever, MdDoneAll} from 'react-icons/md'
import {useState} from 'react' 

const TodoData=styled.div`
    height: 50px;
    width: 100%;
    background-color:rgba(0,0,0,0.3);
    border-radius: 5px;
    box-shadow:1px 2px 3px rgba(0,0,0,0.3);
    margin:2px 0;
    display: flex;
    justify-content: space-between;
    align-items:center;
    overflow: hidden;
    position: relative;
    /* &::after{
        content: "";
        position: absolute;
        top:0%;
        left:0px;
        height:100%;
        width: 100%;
        background-color: #63f46faa;
    } */
`
const Name=styled.div`
    color:rgba(0,0,0,9);
    font-size: 18px;
    padding-left: 10px;
    white-space: nowrap;
    overflow: hidden;
`

const IconContainer=styled.div`
    padding-right:10px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width:80px;
    background-color: #8d8d8d;
    border-radius:0 5px 5px 0;
    box-shadow: -10px 0 0px #8d8d8d;

`
const Button=styled.button`
    background-color:transparent;
    border:2px solid transparent;
    border-radius: 5px;
    transition: all 0.2s;
    &:hover{
        border:2px solid ${(props)=>props.varient==="ok" ? '#0f0' : '#f00'};
        background-color:${(props)=>props.varient==="ok" ? "#97ed9366" : "#edba9366"};
        transform:scale(1.1);
    }
`
const btnStyle={
    cursor:"pointer", 
    fontSize:"25px"
}

const activeStyle={
    color:"white",
    backgroundColor:"green",
    height:"100%",
    width:"100%",
    paddingTop:"25px",
    textDecoration:"line-through",
}
const deactiveStyle={
    color:"black"
}


const Todos = (props) => {
    const [item, setItem] = useState("")
    const getElementInfo=(e)=>{
        const element=document.getElementById(e);
        setItem(element.textContent)
    }
    // console.log(props[0].status)
    // ^^^here item state use for detected clicked item 

  return (
    <>
    {
        props.list.map((val, idx)=>{
            return(
                <TodoData key={idx} id={idx} onMouseEnter={()=>getElementInfo(idx)}>
                    <Name style={val.status?activeStyle:deactiveStyle}>{val.item}{val.status}</Name>
                    <IconContainer>
                        <form method="GET" action="https://todoapinode.herokuapp.com/delete" id="delForm">
                            <input type="hidden" value={item} name="item"/>
                            <Button type="submit">
                                <MdDeleteForever style={btnStyle} color="red"/>
                            </Button>
                        </form>
                        <form method="GET" action="https://todoapinode.herokuapp.com/done" id="doneForm">
                            <input type="hidden" value={item} name="item"/>
                            <Button varient="ok" type="submit">
                                <MdDoneAll style={btnStyle} color="green"/>
                            </Button>
                        </form>
                    </IconContainer>
                </TodoData>
            )
        })
    }
    </>
  )
}

export default Todos