import "./App.css";
import React, { Component, useState } from 'react';

import BodyScheme from "./layout/Main/BodyScheme/BodyScheme";
import RightPanel from "./layout/Main/RightPanel/RightPanel";
import AlertList from "./components/Main/AlertList/AlertList";
import { Dialog } from '@headlessui/react';
import GraphicPage from './pages/GraphicPage/GraphicPage';


// function App() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [paramerts, setParamerts] = useState([]);
//     const [selectedObjectName, setSelectedObjectName] = useState("");

//   return (
//     <>
//       <div className="app">
//         <div className="main-page">
//           <BodyScheme
//             setIsOpen={setIsOpen}
//             setParamerts={setParamerts}
//             setSelectedObjectName={setSelectedObjectName}
//           />
//           <RightPanel>
//             <AlertList />
//           </RightPanel>

//           <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
//             <div className="bg">
//               <Dialog.Panel className="dialog-panel">
//                   <Dialog.Title className="dialog-title">
//                     <div className='header'>{selectedObjectName}</div>
//                     <button onClick={() => setIsOpen(false)}>x</button>
//                   </Dialog.Title>
//                   <GraphicPage
//                     paramerts={paramerts}
//                     objectName={selectedObjectName}
//                   />
//               </Dialog.Panel>
//             </div>
//           </Dialog>
//         </div>
//       </div>
//     </>
//   );
// }
class App extends Component {
  constructor() {
    super();
    this.state = {
      tanks: [],
      levels: []
    }
  }

  componentDidMount() {
    console.log('COMPONENT HAS MOUNTED');
    var that = this;

    fetch("http://localhost:5174/api/tanks")
      .then(function(res) {
        res.json()
          .then(function(data) {
            console.log(data);
            that.setState({
              tanks: data
            });
          });
    });

    fetch("http://localhost:5174/api/levels").then(function (res) {
      res.json().then(function (data) {
        console.log(data);
        that.setState({
          levels: data,
        });
      });
    });
  };

  
  render() {
    let tanks = this.state.tanks;
    let levels = this.state.levels;

    // console.log(typeof tanks[0]);
    // console.log(typeof levels[0]?.tank_id);
    // console.log(typeof levels[0]);
    return (
      <div>
        <h1>Hi</h1>
        {tanks.map((tank) => (
          <li key={tank.id}>
            {tank.name}
          </li>
        ))}

        <h1>Bae</h1>
        {levels.map((level) => (
          <li key={level.id}>
            {level.level_value}
          </li>
        ))}
      </div>
    );
  }
}

export default App;