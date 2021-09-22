import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

/*
function readFile(props) {
  const reader = new FileReader();
  const file = new File([""], props.filePath);
  reader.readAsArrayBuffer(file);
  reader.onload = (e) => {console.log("File Contents: " + e.target.result)};
  return reader.result;
}
*/

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      textboxValue: "",
      list: [],
      filePath: "",
      fileContents: "",
      file: new File([""],"")
    }
  }
  
  handleFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({
      filePath: event.target.value,
      file: file
    });
    const read = new FileReader();
    read.readAsText(file);
    read.onload = (e) => {
      console.log("File read.");
      console.log("File Contents: " + e.target.result);
      this.setState({fileContents: e.target.result});
    }
  }

  handleTextboxChange = (event) => {
    this.setState({textboxValue: event.target.value});
  }
  handleTextboxSubmit = (event) => {
    event.preventDefault();
    const list = this.state.list.slice();
    const textboxValue = this.state.textboxValue.slice();
    this.setState({
      list: list.concat([{
        value: textboxValue
      }])
    });
    console.log("Added to list: " + textboxValue);
    console.log("List length: " + list.length);
  }
  render() {
    const list = this.state.list.map((entry) => {
      return(
        <li>
          <label>{entry.value}</label>
        </li>
      )
    });
    return(
      <div>
        <div className='title'><h1>To Do List</h1></div>
        <div className='used-file'>
          <form onSubmit={this.handleFileSubmit}>
            <input type='file' value={this.state.filePath}
              files
              onChange={this.handleFileChange}/>
          </form>
          <label>{"File Contents: " + this.state.fileContents}</label>
        </div>
        <div className='input-box'>
          <br/>
          <form onSubmit={this.handleTextboxSubmit}>
            <label>
              Add to list: <br/>
              <textarea type="text"
                value={this.state.textboxValue}
                onChange={this.handleTextboxChange}
                placeholder= "New list entry"/>
            </label><br/>
            <input type="submit" value="Add" />
          </form><br/>
        </div>
        <div className='list'>
          <ul>{list}</ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ToDoList />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
