import "./BodyScheme.css";
import { ReactSVG } from "react-svg";
import { useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import paramertData from "../../../components/Graphic/ParametrList/ParamertData.json";
import valueData from "../../../components/Graphic/ParametrList/ValueData.json";

export default function BodyScheme({
  setIsOpen,
  setParamerts,
  setSelectedObjectName
}) {
  const [count, setCount] = useState(0);
  const tranformRef = useRef(null);

  const handleClick = (event) => {
    if (event.target.hasAttribute("clickable")) {
      // добавить для кружочков
      const paramId = event.target.getAttribute("class-name");
      const dataId = event.target.getAttribute("id");
      const nameId = event.target.getAttribute("name");

      setSelectedObjectName(nameId);
      console.log("Нажат объект", paramId, dataId, nameId);

      if (paramId && dataId) {
        const params = paramertData[paramId];
        const values = valueData[dataId];

        console.log("данные", params, values);

        // Объединяем параметры с данными
        const combinedData = params.map((param) => {
          const paramValues = values
            .filter(
              (item) => item.name.toLowerCase() === param.name.toLowerCase()
            )
            .sort((a, b) => new Date(b.time) - new Date(a.time));

          const latestValue =
            paramValues.length > 0 ? paramValues[0].value : "N/A";

          return {
            name: param.name,
            unit: param.unit,
            value: latestValue,
          };
        });

        console.log("Объединенные данные:", combinedData);

        console.log("Полученные данные", combinedData);
        setParamerts(combinedData);
        setIsOpen(true);
      } else {
        console.warn("Параметры не найдены:", groupElement);
      }
    }
  };

  return (
    <div className="body-scheme">
      <table className="table_info">
        <tbody>
          <tr className="yel-row">
            <td>Газ</td>
            <td>&ndash;&ndash;&ndash;&gt;</td>
          </tr>
          <tr className="orange-row">
            <td>Нефть</td>
            <td>&ndash;&ndash;&ndash;&gt;</td>
          </tr>
          <tr className="blue-row">
            <td>Вода</td>
            <td>&ndash;&ndash;&ndash;&gt;</td>
          </tr>
          <tr className='white-row'>
            <td>Инф. выноска</td>
            <td>&ndash; &ndash; &ndash;</td>
          </tr>
        </tbody>
      </table>

      <button className="table_plus" onClick={() => setCount(count + 1)}>
        +
      </button>
      <div className="zoom-button">
        <button
          className="zoomIn-button"
          onClick={() => tranformRef.current?.zoomIn()}
        >
          +
        </button>
        <button
          className="zoomOut-button"
          onClick={() => tranformRef.current?.zoomOut()}
        >
          -
        </button>
        <button
          className="zoomReset-button"
          onClick={() => tranformRef.current?.resetTransform()}
        >
          Reset
        </button>
      </div>
      <TransformWrapper ref={tranformRef}>
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%" }}
          contentStyle={{ width: "100%", height: "100%" }}
        >
          <ReactSVG
            src="./scheme2-01-1.svg"
            className="scheme1"
            onClick={handleClick}
            beforeInjection={(svg) => {
              const textElement = svg.querySelector("#sep1-oil");
              if (textElement) {
                textElement.textContent = count;
              }

              const useElements = svg.querySelectorAll("use");
              useElements.forEach((el) => {
                el.addEventListener("click", handleClick);
                el.style.cursor = "pointer";
              });
            }}
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}