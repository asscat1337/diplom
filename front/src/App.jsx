import "./App.css";
import { useState } from 'react';

import BodyScheme from "./layout/Main/BodyScheme/BodyScheme";
import RightPanel from "./layout/Main/RightPanel/RightPanel";
import AlertList from "./components/Main/AlertList/AlertList";
import { Dialog } from '@headlessui/react';
import GraphicPage from './pages/GraphicPage/GraphicPage';


function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [paramerts, setParamerts] = useState([]);
    const [selectedObjectName, setSelectedObjectName] = useState("");

  return (
    <>
      <div className="app">
        <div className="main-page">
          <BodyScheme
            setIsOpen={setIsOpen}
            setParamerts={setParamerts}
            setSelectedObjectName={setSelectedObjectName}
          />
          <RightPanel>
            <AlertList />
          </RightPanel>

          <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="bg">
              <Dialog.Panel className="dialog-panel">
                  <Dialog.Title className="dialog-title">
                    <div className='header'>{selectedObjectName}</div>
                    <button onClick={() => setIsOpen(false)}>x</button>
                  </Dialog.Title>
                  <GraphicPage
                    paramerts={paramerts}
                    objectName={selectedObjectName}
                  />
              </Dialog.Panel>
            </div>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default App;