import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import "./Register.css";

const dataTipoSolicitacao = [
    ["Tag", "Reg. Financeiro", { role: "annotation" }, "Sol. Suprimento", { role: "annotation" }],
    ["2010", 80, "80", 20, "20"],
    ["2011", 95, "95", 10, "10"],
    ["2012", 105, "105", 30, "30"],
    ["2013", 110, "110", 50, "50"],
    ["2014", 130, "130", 5, "5"],
    ["2015", 140, "140", 90, "90"],
  ];

  const dataUserSolicitacao = [
    ["Usuário", "Quantidade", { role: "annotation" }],
    ["Celio", 100, "100"],
    ["Joilson", 50, "50"],
    ["Edivado", 12, "12"],
  ];

  
const optionsBar = {
    title: "Lista",
    titleTextStyle: { color: "white" }, 
    legend: { position: "right", textStyle: { color: "#DAA520" } },
    backgroundColor: "transparent",
    hAxis: {
      slantedText: true,
      slantedTextAngle: 45,
      textStyle: { color: "#DAA520" }
    },
    annotations: {
      alwaysOutside: true,
      textStyle: {
        fontSize: 14,
        color: "#FFFFFF",
        auraColor: "none"
      }
    },
    width: Math.max(800, dataTipoSolicitacao.length * 50),
    height: 600
  };

const optionsPizza = {
  title: "Lista",
  titleTextStyle: { color: "#DAA520"}, 
  legend: { position: "right", textStyle: { color: "#DAA520" } },
  backgroundColor: "transparent",
  hAxis: {
    slantedText: true,
    slantedTextAngle: 45,
    textStyle: { color: "#FFD700" }
  },
  annotations: {
    alwaysOutside: true,
    textStyle: {
      fontSize: 14,
      color: "#FFFFFF",
      auraColor: "none"
    }
  },
  width: Math.max(800, dataTipoSolicitacao.length * 50),
  height: 600
};

function Register() {
  const [highlightedChart, setHighlightedChart] = useState("bar");

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedChart((prev) => (prev === "bar" ? "pie" : "bar"));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="charts-wrapper">
        <div className="sidebar">
          <div className={`mini-chart ${highlightedChart === "bar" ? "dimmed" : ""}`}>
            <div className="legend">
                <h4 className="legend-qtd">Solicitações Reprovadas</h4>
                <p className="legend-value">N = {44}</p>
            </div>
          </div>
          <div className={`mini-chart ${highlightedChart === "pie" ? "dimmed" : ""}`}>
            <div className="legend">
                <h4 className="legend-qtd">Aguardando Preenchimento</h4>
                <p className="legend-value">N = {44}</p>
            </div>
          </div>
        </div>
        <div className="main-chart">
          {highlightedChart === "bar" ? (
            <>
            <h2 className="main-title">Tipos de solicitação por usuário</h2>
            <Chart chartType="ColumnChart" data={dataTipoSolicitacao} options={optionsBar} />
            </>
          ) : (
            <>
            <h2 className="main-title">Quantidade de solicitação com pendência por usuário</h2>
            <Chart chartType="ColumnChart" data={dataUserSolicitacao} options={{ ...optionsPizza, width: 1000, height: 700 }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
