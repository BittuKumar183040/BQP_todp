import styled from 'styled-components';
import Todos from './component/Todos';
import { useEffect, useState} from 'react';


const Heading=styled.p`
  color: white;
  text-shadow:0 0 3px rgba(0,0,0,0.5);
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 2px;
  
`
const Container=styled.div`
  position: absolute;
  left:50%;
  top:20px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  overflow: hidden;
  background-color:rgba(0,0,0,0.05);
  padding:20px 30px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
`

const ToDoArea=styled.div`
  /* background-color: red; */
  width: 100%;
  display: flex; 
  flex-direction: column-reverse;
  box-shadow: 10px 0px 0 white,
  -10px 0px 0 white,
  0px 10px 0 white,
  0px -10px 0 white,
  10px 10px 0 white,
  10px -10px 0 white,
  -10px -10px 0 white,
  -10px 10px 0 white,
  12px 12px 8px rgba(0,0,0,0.2);

`
const Input=styled.input`
  width:calc(100% - 20px);
  height:40px;
  font-size: 15px;
  padding:0 10px;
  border: none;
  background-color: rgba(0,0,0,0.1);
  &:focus{
    outline: none;
  }
  `
const Button=styled.input`
  color: #0009;
  padding:10px 40px;
  margin: 10px 0 20px 0;
  background-color: #545a;
  border-radius: 5px;
  font-weight: bold;
  border: white;
  width: fit-content;
  box-shadow: 2px 2px 3px rgba(0,0,0,0.4);
  cursor: pointer;
  transition:all 0.2s;
  &:hover{
    color: #000a00;
    box-shadow: 0px 0px 2px rgba(0,0,0,0.8);
    background-color: #5489;
    color: #000b;
  } 
`
const Form=styled.form`
  width: 100%;
`


const App=()=> {
  const [inputData, setinputData] = useState("");
  const [data,setData]=useState([])

  useEffect(()=>{
    fetch("https://todoapinode.herokuapp.com/")
        .then((res)=>res.json())
        .then((data)=>setData(data.filter(n=>n)))
  },[])

  const inputBox=(e)=>{
    setinputData(e.target.value)
  }


  return (
    <Container>
      <Heading>ToDo App</Heading>
      <Form action="https://todoapinode.herokuapp.com/process_post" method="GET">
        <Input 
          type="text" 
          name="item" 
          placeholder='Enter Item Name' 
          onChange={inputBox} 
          value={inputData}
          onLoad={(e)=>e.focus()}
          autoFocus
          required/>
        <Button 
          type="submit" 
          value="ADD"/>
      </Form>
        <ToDoArea>
          <Todos list={data}/>
        </ToDoArea>
    </Container>
  );
}

export default App;
