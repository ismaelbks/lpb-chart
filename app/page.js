"use client";

import { htmlLegendPlugin } from "@/chartUtils/pieCustomLegendPlugin";
import Chart from "chart.js/auto";
import { useEffect } from "react";

export default function Home() {
  Chart.defaults.locale = "fr-FR";
  Chart.defaults.font.size = "14px";
  Chart.defaults.font.family = "Montserrat, sans-serif";
  Chart.defaults.padding = 0;
  Chart.defaults.plugins.tooltip.boxWidth = 8;
  Chart.defaults.plugins.tooltip.boxHeight = 8;
  Chart.defaults.plugins.tooltip.boxPadding = 4;
  Chart.defaults.plugins.tooltip.backgroundColor = "#001C55";
  Chart.defaults.plugins.tooltip.padding = 16;
  Chart.defaults.plugins.tooltip.cornerRadius = 8;
  Chart.defaults.plugins.tooltip.caretSize = 12;
  Chart.defaults.plugins.borderwidth = 0;

  function generateChart1() {
    const data = {
      datasets: [
        {
          data: [8, 2, 3, 5],
          backgroundColor: ["#001C55", "#F7B00F", "#4DCD5A", "#DF605B"],
        },
      ],
      labels: ["En cours", "Financés", "Remboursés", "En retard"],
    };

    const config = {
      type: "pie",
      data: data,
      options: {
        plugins: {
          htmlLegend: {
            containerID: "chart-1-legend",
          },
          legend: {
            display: false,
          },
        },
      },
      plugins: [htmlLegendPlugin],
    };

    const ctx = document.getElementById("chart1");
    new Chart(ctx, config);
  }

  function generateChart2() {
    const data = {
      datasets: [
        {
          data: [5, 4],
          backgroundColor: ["#3884CC", "#4DCD5A"],
        },
      ],
      labels: ["Marchands de biens", "Promotion immo."],
    };

    const config = {
      type: "pie",
      data: data,
      options: {
        plugins: {
          htmlLegend: {
            containerID: "chart-2-legend",
          },
          legend: {
            display: false,
          },
        },
      },
      plugins: [htmlLegendPlugin],
    };

    const ctx = document.getElementById("chart2");
    new Chart(ctx, config);
  }

  useEffect(() => {
    generateChart1();
    generateChart2();
  }, []);

  return (
    <main className="bg-[#F9F9FA]">
      <container className="flex gap-5 py-24 mx-auto max-w-7xl">
        <div className="flex flex-col max-w-xl p-8 bg-white rounded-lg gap-y-8 border border-[#E5E5E8]">
          <h2 className="text-2xl text-[#1C1C31] font-semibold">
            Statuts de mes projets
          </h2>
          <div className="flex items-center justify-between gap-8">
            <div className="w-[200px] h-[200px] flex-none">
              <canvas id="chart1" width="200" height="200" />
            </div>
            <div id="chart-1-legend" className="grow min-w-[200px]"></div>
          </div>
        </div>

        <div className="flex flex-col max-w-xl p-8 bg-white rounded-lg gap-y-8 border border-[#E5E5E8]">
          <h2 className="text-2xl text-[#1C1C31] font-semibold">
            Typologie de mes projets
          </h2>
          <div className="flex items-center justify-between gap-8">
            <div className="w-[200px] h-[200px] flex-none">
              <canvas id="chart2" width="200" height="200" />
            </div>
            <div id="chart-2-legend" className="grow min-w-[220px]"></div>
          </div>
        </div>
      </container>
    </main>
  );
}
