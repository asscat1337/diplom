import "./AlertItem.css";

export default function AlertItem({name, datatime, message}) {

  return (
    <div className="alert-block">
      <div className="alert-head">
        <div className="alert-head-name">{name}</div>
        <div className="alert-datatime">{datatime}</div>
      </div>
      <div className="alert-message">{message}</div>
    </div>
  );
}
