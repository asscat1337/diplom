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

import lineChartData from "./data.json";
import "./Line.css";

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

const parsedData = lineChartData.map((data) => ({
  ...data,
  label: new Date(data.label),
}));

const values = parsedData.map((data) => data.value);

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
      min: parsedData[parsedData.length - 10].label, // начальная точка
      max: parsedData[parsedData.length - 1].label, // конечная точка
    },
    y: {
      min: Math.min(...values) - 0.01,
      max: Math.max(...values) + 0.01,
    },
  },
  plugins: {
    zoom: {
      limits: {
        // чтобы нельзя было слишком сильно уменьшить,
        // чтобы график слишком маленьким не был
        x: {
          min: parsedData[0].label.getTime(), // минимальная дата
          max: parsedData[parsedData.length - 1].label.getTime(), // максимальная дата
        },
      },
      pan: {
        enabled: true,
        mode: "x",
        rangeMin: {
          // чтобы нельзя было прокрутить график за пределы данных
          // типо данные графика слева, а на экране пусто
          x: parsedData[0].label.getTime(), // минимальная дата
        },
        rangeMax: {
          x: parsedData[parsedData.length - 1].label.getTime(), // максимальная дата
        },
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

export const LineGraph = () => {
  return (
    <Line
      data={{
        labels: parsedData.map((data) => data.label), // преобразуем в формат времени
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
};
