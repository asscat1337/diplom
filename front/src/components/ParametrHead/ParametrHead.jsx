import './ParametrHead.css';

export default function ParametrItem({ name, value, unit }) {

    return (
            <div className="parametr-head">
                <div className='parametr-head__name'>{ name }</div>
                <div className="parametr-item__value">{ value }</div>
                <div className="parametr-item__unit">{ unit }</div>
            </div>
    );
};