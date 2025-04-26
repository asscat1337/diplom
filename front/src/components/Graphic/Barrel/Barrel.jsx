import "./Barrel.css";

export default function Barrel() {

  return (
    <div className="barrel">
      <div className="barrel__head">
        <div className="barrel__head_txt">УРОВЕНЬ РАЗДЕЛА ФАЗ, М</div>
      </div>

      <div className="barrel__body">
        <div className="barrel__img">
          <img
            className="barrel__img_svg"
            src="./barrel.svg"
            alt="barrel pic"
          />
        </div>

        <div className="barrel__right_panel">
          <div className="barrel__level_num">
            <div className="barrel__level_text">8,34</div>
            <div className="barrel__level_text">8,05</div>
          </div>

          <div className="barrel__level">
            <div className="barrel__level_gas"></div>
            <div className="barrel__level_oil"></div>
            <div className="barrel__level_water"></div>
          </div>

          <div className="barrel__level_name">
            <div className="barrel__level_text1">Газ</div>
            <div className="barrel__level_text1">Нефть</div>
            <div className="barrel__level_text1">Вода</div>
          </div>
        </div>
      </div>
    </div>
  );
}
