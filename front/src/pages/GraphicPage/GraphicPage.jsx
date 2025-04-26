import LeftPanel from "../../layout/Graphic/LeftPanel/LeftPanel";
import ParametrHead from "../../components/ParametrHead/ParametrHead";
import ParametrList from "../../components/Graphic/ParametrList/ParametrList";
import Barrel from "../../components/Graphic/Barrel/Barrel";
import Body from "../../layout/Graphic/Body/Body";
import { LineGraph } from "../../components/Graphic/Graphics/Line";
import AlertPanel from "../../components/Graphic/AlertPanel/AlertPanel";

import './GraphicPage.css';


export default function GraphicPage({ paramerts, objectName }) {
  // console.log("graphic", objectName);

  return (
    <div className="page">
      <div className="graphic-page">
        <LeftPanel>
          <ParametrHead
            name="Параметр"
            value="Величина"
            unit="Ед. изм."
          />
          {/* {console.log("Параметры", paramerts)} */}
          <ParametrList paramertData={paramerts} />
          <Barrel />
        </LeftPanel>
        <Body>
          <LineGraph />
          <AlertPanel />
        </Body>
      </div>
    </div>
  );
}