function transparentizeColor(hex, opacity) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
}

const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer?.querySelector("ul");

  if (!listContainer) {
    listContainer = document.createElement("ul");
    listContainer.style.display = "flex";
    listContainer.style.flexDirection = "column";
    listContainer.style.rowGap = "2px";
    listContainer.style.margin = 0;
    listContainer.style.padding = 0;

    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

export const htmlLegendPlugin = {
  id: "htmlLegend",
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach((item) => {
      const { type: chartType } = chart.config;

      const currentDataset = ["pie", "doughnut"].includes(chartType)
        ? chart.data.datasets[0]
        : chart.data.datasets[item.datasetIndex];

      const li = document.createElement("li");
      li.style.fontSize = "14px";
      li.style.alignItems = "center";
      li.style.cursor = "pointer";
      li.style.display = "flex";
      li.style.flexDirection = "row";
      li.style.rowGap = "5px";
      li.style.justifyContent = "space-between";
      li.style.alignItems = "center";
      li.style.padding = "0 16px";
      li.style.height = "34px";
      li.style.backgroundColor = transparentizeColor(item.fillStyle, 0.1);
      !!item.hidden && (li.style.filter = "grayscale(100%)");

      li.onclick = () => {
        if (["pie", "doughnut"].includes(chartType)) {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(
            item.datasetIndex,
            !chart.isDatasetVisible(item.datasetIndex)
          );
        }
        chart.update();
      };

      const colorBoxSvg = `<svg
          width="24"
          height="16"
          viewBox="0 0 24 16"
          fill="none"
        >
          <path
            d="M5.60806 0L11.6974 2.13657L17.7626 0L23.4668 1.79666V11.654L11.6974 16L0.0001297 11.654V1.79666L5.60806 0Z"
            fill="currentColor"
          />
        </svg>`;
      const colorBox = document.createElement("div");
      colorBox.style.color = item.fillStyle;
      colorBox.style.marginRight = "12px";
      colorBox.insertAdjacentHTML("beforeend", colorBoxSvg);

      // Label
      const labelContainer = document.createElement("p");
      labelContainer.style.fontWeight = 400;
      labelContainer.style.color = "#1C1C31";
      labelContainer.style.display = "block";
      labelContainer.style.marginRight = "4px";
      labelContainer.style.fontFamily = "Montserrat, sans-serif";
      labelContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const label = document.createTextNode(item.text);
      labelContainer.appendChild(label);
      const countContainer = document.createElement("span");
      countContainer.style.display = "block";
      countContainer.style.fontWeight = 600;
      countContainer.style.color = item.fillStyle;
      countContainer.style.fontFamily = "Montserrat, sans-serif";
      countContainer.style.marginLeft = "auto";
      countContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const value = currentDataset.data[item.index];
      const count = document.createTextNode(value);
      countContainer.appendChild(count);

      li.appendChild(colorBox);
      li.appendChild(labelContainer);
      li.appendChild(countContainer);

      ul.appendChild(li);
    });
  },
};
