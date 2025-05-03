import './ParametrItem.css';

export default function ParametrItem({ name, value, unit }) {

    return (
      <button className="parametr-item" onClick={() => console.log("hi")}>
          <div className="parametr-item__name">{name}</div>
          <div className="parametr-item__value">{value}</div>
          <div className="parametr-item__unit">{unit}</div>
      </button>
    );
};