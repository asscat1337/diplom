import "./ParametrList.css";
import ParametrBlock from "../ParametrBlock/ParametrBlock";
import ParametrItem from "../ParametrItem/parametrItem";


export default function ParametrList({ paramertData }) {

  const data = Array.isArray(paramertData) ? paramertData : [];

  return (
    <div className="parametr_list">
      <ParametrBlock name="Параметры ёмкости" />

      {data.map((paramert, index) => (
        <ParametrItem
          key={index}
          name={paramert.name}
          value={paramert.value}
          unit={paramert.unit}
        />
      ))}
    </div>
  );
}