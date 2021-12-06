import React from 'react';
import './App.scss';
// import 'antd/dist/antd.less';
// import '@progress/kendo-react-material/dist/all.css';
import Home from './kendo apollo/modules/Home';
import NavBar from './kendo apollo/components/NavBar'

function App() {
  return (
    <div classnmae="body">
      <NavBar />
      <div className="App main" style={{overFlowY: "scroll"}}>
        <Home />
      </div>
    </div>
  );
}

export default App;
