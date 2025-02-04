import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import "./Consumption.css";

const dataBar = [
  ["Tag", "Qtd por Lt."],
  ["2010", 80],
  ["2011", 95],
  ["2012", 105],
  ["2013", 110],
  ["2014", 130],
  ["2015", 140],
  ["2016", 150],
  ["2017", 160],
  ["2018", 170],
  ["2019", 180],
  ["2020", 190],
  ["2021", 200],
  ["2022", 210],
  ["2023", 220],
  ["2015", 140],
  ["2016", 150],
  ["2017", 160],
  ["2018", 170],
  ["2019", 180],
  ["2020", 190],
  ["2021", 200],
  ["2022", 210],
  ["2023", 220],
  ["2015", 140],
];


const dataPizza = [
  ["Tipo", "Quantidade"],
  ["Corretiva", 11],
  ["Preventiva", 2],
  ["Preditiva", 2],
];

const optionsBar = {
  title: "Consumo de cada equipamento",
  titleTextStyle: { color: "white"}, 
  legend: { position: "right", textStyle: { color: "#fff" } },
  backgroundColor: "transparent",
  hAxis: {
    slantedText: true,
    slantedTextAngle: 45,
    textStyle: { color: "#fff" }
  },
  width: Math.max(800, dataBar.length * 50),
  height: 600
};
const optionsPizza = {
  title: "Manutenção",
  titleTextStyle: { color: "white"}, 
  backgroundColor: "transparent",
  legend: { position: "right", textStyle: { color: "#fff", fontSize: 18 } },
};



const optionsBarMini = {
  legend: "none",
  title: "Consumo",
  titleTextStyle: { color: "white"},  
  backgroundColor: "transparent",
};
const optionsPizzaMini = {
  legend: "none",
  title: "Manutenção",
  titleTextStyle: { color: "white"}, 
  backgroundColor: "transparent",
};

function Consumption() {
  const [highlightedChart, setHighlightedChart] = useState("bar");

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedChart((prev) => (prev === "bar" ? "pie" : "bar"));
    }, 10000); //tempo para mudança de chart definido em 5 minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="charts-wrapper">
        <div className="sidebar">
          <div className={`mini-chart ${highlightedChart === "bar" ? "dimmed" : ""}`}>
            <Chart chartType="ColumnChart" data={dataBar} options={optionsBarMini} width={200} height={150} />
          </div>
          <div className={`mini-chart ${highlightedChart === "pie" ? "dimmed" : ""}`}>
            <Chart chartType="PieChart" data={dataPizza} options={optionsPizzaMini} width={200} height={150} />
          </div>
        </div>
        <div className="main-chart">
          {highlightedChart === "bar" ? (
            <>
            <h2 className="main-title">Relatório de Consumo</h2>
            <p className="main-chart-text-p">Relatório com intuito de exibir o consumo médio para cada equipamento para os ultimos 30 dias</p>
            <Chart chartType="ColumnChart" data={dataBar} options={optionsBar} />
            </>
          ) : (
            <>
            <h2 className="main-title">Relatório de manuteção</h2>
            <p className="main-chart-text-p">Relatório com intuito de exibir o quantidade de solicitações definido por tipo foram feitas nos ultimos 30 dias</p>
            <Chart chartType="PieChart" data={dataPizza} options={{ ...optionsPizza, width: 1000, height: 700 }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Consumption;
