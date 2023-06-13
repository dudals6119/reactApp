import './App.css';
import { useState } from 'react';
import data from './data.js';

function App() {
  let [datas, setDatas] = useState(data);
  let [modal, setModal] = useState(false);
  let [write, setWrite] = useState(false);
  let [index, setIndex] = useState(0);
  return (
    <div>
      <div className="black-nav">
        <h3>로봇펀치</h3>
      </div>
      
      {
        datas.map(function (row, i) {
          return (
            <div className="list">
              <div className="title" onClick={() => {
                modal ? setModal(false) : setModal(true);
                setIndex(i);
              }}>{row.title}</div>
              <div className="contents">{row.date}</div>
            </div>
          )
        })
      }
      {modal ? <Modal modal={modal}
        setModal={setModal}
        datas={datas}
        setDatas={setDatas}
        index={index}
      ></Modal> : ''}

    </div>
  );
}

function Write(props){
  let [title, setTitle] = useState('');
  let [contents, setContents] = useState('');
  return (
    <div className='modal'>
      <div className='modal-body'>
        <div className="write-content">
          <span>글제목</span>
          <input type='text'
                onChange={(e)=>{
                  setTitle(e.target.value);
                }}
                ></input>
          <span>글내용</span>
          <textarea onChange={(e)=>{
            setContents(e.target.value)
          }}></textarea>
        </div>
        <button className="modal-button"
                onClick={()=>{
                  let data={                    
                    title: title,
                    date: '2023-05-16',
                    content: contents,
                    like: 0
                  }
                  let copy = [...props.datas];
                  copy.unshift(data);
                  props.setDatas(copy);
                  props.setWrite(false);

                }}
        >확인</button>
      </div>
    </div>
  )
}
function Modal(props) {
  let [modify, setModify] = useState(false);
  let [contents, setContents] = useState('');
  return (
    <div className="modal">
      <div className="modal-body">
        <div className="modal-title">
          {props.datas[props.index].img}
        </div>
        <div className="modal-date">
          {props.datas[props.index].date}
          {props.datas[props.index].link}
        </div>
        <div>
        {props.datas[props.index].robot}
        {props.datas[props.index].robotcontent}
        </div>
        {modify ?
          <div className="modal-contents">
            <textarea 
            className='modify-content' 
            onChange={(e)=>{              
              setContents(e.target.value)
            }}
            value={contents} />
          </div> :
          <div className="modal-contents">{props.datas[props.index].content}</div>
        }

        <button className="modal-button" onClick={() => {
          props.modal ? props.setModal(false) : props.setModal(true);
        }}>확인</button>
        
      </div>
    </div>
  )
}

export default App;