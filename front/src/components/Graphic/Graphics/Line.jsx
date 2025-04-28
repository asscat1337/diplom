import {
  Chart as ChartJS,
  TimeScale, // x (time scale)
  LinearScale, // y
  PointElement,
  LineElement,
  Title, // это не обязательно
  Tooltip, // всплывающая подсказка для элемента
  Legend,
  Filler,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import "./Line.css";

// import lineChartData from "./data.json";
import { Component } from 'react';

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

class LineGraph extends Component {
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
    let parsedData = levels.map((data) => ({
      ...data,
      time: new Date(data.time),
    }));

    let values = parsedData.map((data) => data.level_volume);

    const options = {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "hour",

            displayFormats: {
              hour: "HH:hh:ss",
            },
          },
          ticks: {
            maxRotation: 0,
            minRotation: 0,
          },
          // min: parsedData[parsedData.length - 10].time, // начальная точка
          // max: parsedData[parsedData.length - 1].time, // конечная точка
        },
        // y: {
        //   min: Math.min(...values) - 0.01,
        //   max: Math.max(...values) + 0.01,
        // },
      },
      plugins: {
        zoom: {
          limits: {
            // чтобы нельзя было слишком сильно уменьшить,
            // чтобы график слишком маленьким не был
            // x: {
            //   min: parsedData[0].time.getTime(), // минимальная дата
            //   max: parsedData[parsedData.length - 1].time.getTime(), // максимальная дата
            // },
          },
          pan: {
            enabled: true,
            mode: "x",
            // rangeMin: {
            //   // чтобы нельзя было прокрутить график за пределы данных
            //   // типо данные графика слева, а на экране пусто
            //   x: parsedData[0].time.getTime(), // минимальная дата
            // },
            // rangeMax: {
            //   x: parsedData[parsedData.length - 1].time.getTime(), // максимальная дата
            // },
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
      },
    };
    

    return (
      <Line
        data={{
          labels: parsedData.map((data) => data.time), // преобразуем в формат времени
          datasets: [
            {
              label: "Наличие воды",
              data: values,
              borderColor: "rgb(86, 160, 207)",
              fill: true, // Включаем заливку под графиком
              // backgroundColor: "rgb(86, 160, 207)", // Цвет заливки под графиком
            },
          ],
        }}
        options={options}
        className="graphic"
      />
    );
  }
};

export default LineGraph;