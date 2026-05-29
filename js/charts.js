(function () {
  const instances = [];
  const registry = [];

  function isReducedMotion() {
    return window.RespiraAccessibility?.prefersReducedMotion?.() || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function isHighContrast() {
    return document.body.classList.contains("high-contrast");
  }

  function palette() {
    if (isHighContrast()) {
      return ["#000000", "#555555", "#111111", "#777777", "#333333", "#999999", "#222222", "#666666"];
    }
    return ["#0a4fa4", "#d65f00", "#008c95", "#2f8f5b", "#b87900", "#7a4fb3", "#b42318", "#314057"];
  }

  function formatSpanish(value, unit = "") {
    const number = Number(value);
    const formatted = Number.isFinite(number)
      ? new Intl.NumberFormat("es-ES", {
          maximumFractionDigits: Number.isInteger(number) ? 0 : 1
        }).format(number)
      : value;

    if (unit === "EUR") return `${formatted} €`;
    if (unit === "%") return `${formatted} %`;
    if (unit) return `${formatted} ${unit}`;
    return formatted;
  }

  function inferUnit(id, chart, index = 0) {
    if (chart.units?.[index]) return chart.units[index];
    if (id === "population") return "personas";
    if (id === "budget") return "EUR";
    if (["mentalHealth", "wellbeing", "bodyDissatisfaction"].includes(id)) return "%";
    return "";
  }

  function buildDatasetRows(id, chart) {
    if (id === "budget" && chart.items) {
      return chart.items.map((item) => ({
        label: item.category,
        values: [item.amount],
        description: item.description,
        unit: "EUR"
      }));
    }

    return chart.labels.map((label, labelIndex) => ({
      label,
      values: chart.datasets.map((dataset) => dataset.data[labelIndex]),
      unit: inferUnit(id, chart, labelIndex)
    }));
  }

  function buildTable(id, chart, tableId) {
    const table = document.createElement("table");
    table.className = "data-table";

    const caption = document.createElement("caption");
    caption.textContent = `Tabla alternativa: ${chart.title}`;
    table.append(caption);

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const firstHeader = document.createElement("th");
    firstHeader.scope = "col";
    firstHeader.textContent = id === "budget" ? "Partida" : "Periodo o indicador";
    headerRow.append(firstHeader);

    if (id === "budget") {
      ["Descripción", "Importe"].forEach((label) => {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = label;
        headerRow.append(th);
      });
    } else {
      chart.datasets.forEach((dataset) => {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = dataset.label;
        headerRow.append(th);
      });
      if (chart.units) {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = "Unidad";
        headerRow.append(th);
      }
    }

    thead.append(headerRow);
    table.append(thead);

    const tbody = document.createElement("tbody");
    buildDatasetRows(id, chart).forEach((row) => {
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      th.scope = "row";
      th.textContent = row.label;
      tr.append(th);

      if (id === "budget") {
        const tdDescription = document.createElement("td");
        tdDescription.textContent = row.description;
        tr.append(tdDescription);

        const tdAmount = document.createElement("td");
        tdAmount.textContent = formatSpanish(row.values[0], row.unit);
        tr.append(tdAmount);
      } else {
        row.values.forEach((value, valueIndex) => {
          const td = document.createElement("td");
          td.textContent = formatSpanish(value, inferUnit(id, chart, valueIndex === 0 ? chart.labels.indexOf(row.label) : valueIndex));
          tr.append(td);
        });

        if (chart.units) {
          const td = document.createElement("td");
          td.textContent = row.unit;
          tr.append(td);
        }
      }

      tbody.append(tr);
    });

    table.append(tbody);

    const wrap = document.createElement("div");
    wrap.className = "table-wrap";
    wrap.id = tableId;
    wrap.hidden = true;
    wrap.append(table);
    return wrap;
  }

  function fallbackChart(area, id, chart) {
    area.innerHTML = "";
    const rows = buildDatasetRows(id, chart);
    const values = rows.flatMap((row) => row.values.map(Number)).filter(Number.isFinite);
    const max = Math.max(...values, 1);
    const fallback = document.createElement("div");
    fallback.className = "fallback-chart";
    fallback.setAttribute("role", "img");
    fallback.setAttribute("aria-label", chart.description);

    rows.forEach((row) => {
      row.values.forEach((value, index) => {
        const line = document.createElement("div");
        line.className = "fallback-row";

        const label = document.createElement("strong");
        const datasetLabel = chart.datasets?.[index]?.label ? ` ${chart.datasets[index].label}` : "";
        label.textContent = `${row.label}${datasetLabel}`;

        const bar = document.createElement("div");
        bar.className = "fallback-bar";
        const fill = document.createElement("span");
        fill.style.width = `${Math.max(4, (Number(value) / max) * 100)}%`;
        bar.append(fill);

        const number = document.createElement("span");
        number.textContent = formatSpanish(value, row.unit || inferUnit(id, chart, index));

        line.append(label, bar, number);
        fallback.append(line);
      });
    });

    area.append(fallback);
  }

  function chartOptions(id, chart) {
    const percentCharts = ["mentalHealth", "wellbeing", "bodyDissatisfaction"].includes(id);
    const unitFromIndex = (index) => inferUnit(id, chart, index);

    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: isReducedMotion() ? 0 : 950,
        easing: "easeOutQuart"
      },
      interaction: {
        mode: id === "budget" ? "nearest" : "index",
        intersect: false
      },
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            usePointStyle: true,
            boxWidth: 10,
            color: isHighContrast() ? "#000000" : "#314057",
            font: {
              weight: "bold"
            }
          }
        },
        tooltip: {
          callbacks: {
            title(items) {
              return items?.[0]?.label || chart.title;
            },
            label(context) {
              if (id === "budget") {
                return `${context.label}: ${formatSpanish(context.raw, "EUR")}`;
              }
              const unit = chart.units?.[context.dataIndex] || (percentCharts ? "%" : unitFromIndex(context.dataIndex));
              return `${context.dataset.label}: ${formatSpanish(context.raw, unit)}`;
            },
            afterBody() {
              return chart.source ? `Fuente: ${chart.source}` : "";
            }
          }
        }
      },
      scales:
        id === "budget"
          ? {}
          : {
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  color: isHighContrast() ? "#000000" : "#667085"
                }
              },
              y: {
                beginAtZero: !["wellbeing"].includes(id),
                suggestedMax: percentCharts ? 100 : undefined,
                grid: {
                  color: isHighContrast() ? "#000000" : "rgba(102, 112, 133, 0.18)"
                },
                ticks: {
                  color: isHighContrast() ? "#000000" : "#667085",
                  callback(value) {
                    if (percentCharts) return `${value} %`;
                    if (id === "population") return new Intl.NumberFormat("es-ES").format(value);
                    return value;
                  }
                }
              }
            }
    };
  }

  function chartConfig(id, chart) {
    const colors = palette();

    if (id === "budget") {
      return {
        type: "doughnut",
        data: {
          labels: chart.items.map((item) => item.category),
          datasets: [
            {
              label: "Presupuesto",
              data: chart.items.map((item) => item.amount),
              backgroundColor: chart.items.map((_, index) => colors[index % colors.length]),
              borderColor: "#ffffff",
              borderWidth: 2
            }
          ]
        },
        options: chartOptions(id, chart)
      };
    }

    const isLine = chart.type === "line";
    return {
      type: chart.type,
      data: {
        labels: chart.labels,
        datasets: chart.datasets.map((dataset, index) => ({
          label: dataset.label,
          data: dataset.data,
          borderColor: colors[index % colors.length],
          backgroundColor: isLine ? colors[index % colors.length] : colors[index % colors.length],
          borderWidth: isLine ? 3 : 0,
          pointRadius: isLine ? 5 : 0,
          pointHoverRadius: isLine ? 7 : 0,
          tension: 0.32,
          borderRadius: isLine ? 0 : 6
        }))
      },
      options: chartOptions(id, chart)
    };
  }

  function renderRegisteredChart(entry) {
    const { area, canvas, id, chart } = entry;
    const existing = instances.find((item) => item.canvas === canvas);
    if (existing) {
      existing.instance.destroy();
      instances.splice(instances.indexOf(existing), 1);
    }

    if (!window.Chart) {
      fallbackChart(area, id, chart);
      return;
    }

    area.innerHTML = "";
    area.append(canvas);
    const instance = new Chart(canvas.getContext("2d"), chartConfig(id, chart));
    instances.push({ canvas, instance });
  }

  function createChartCard(id, chart) {
    const article = document.createElement("article");
    article.className = "chart-card";
    article.setAttribute("role", "region");
    article.setAttribute("aria-labelledby", `${id}-title`);

    const head = document.createElement("div");
    head.className = "chart-head";

    const title = document.createElement("h3");
    title.id = `${id}-title`;
    title.textContent = chart.title;

    const description = document.createElement("p");
    description.id = `${id}-description`;
    description.textContent = chart.description;

    head.append(title, description);

    const area = document.createElement("div");
    area.className = "chart-area";
    const canvas = document.createElement("canvas");
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", chart.description);
    canvas.setAttribute("aria-describedby", `${id}-description`);
    area.append(canvas);

    const source = document.createElement("p");
    source.className = "chart-source";
    source.textContent = chart.source ? `Fuente: ${chart.source}` : "";

    const tableId = `${id}-table`;
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "table-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", tableId);
    toggle.textContent = "Ver tabla accesible";

    const table = buildTable(id, chart, tableId);

    article.append(head, area, source, toggle, table);

    const entry = { area, canvas, id, chart };
    registry.push(entry);
    requestAnimationFrame(() => renderRegisteredChart(entry));
    return article;
  }

  function refreshCharts() {
    registry.forEach(renderRegisteredChart);
  }

  window.RespiraCharts = {
    createChartCard,
    refreshCharts,
    formatSpanish
  };
})();
