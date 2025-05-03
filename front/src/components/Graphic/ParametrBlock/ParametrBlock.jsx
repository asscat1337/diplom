import "./ParametrBlock.css";

export default function ParametrBlock({ name }) {
    
    return (
        <div className="parametr-block">
            <div className="parametr-block__body">{ name }</div>
        </div>
    );
};