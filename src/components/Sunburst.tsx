import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { usePortfolioData } from "../hooks/usePortfolioData";
import _ from "lodash";
import rawData from "../__mocks__/example_mapping.json";
import { THEME, YEAR } from "../constants/metrics";
import { BRIGHT_COLORS } from "../constants/colors";

interface DataItem {
  product: string;
  revenueShare: number;
  themesCovered: number;
}

const DonutChart = () => {
  const portfolioData = usePortfolioData();
  const lastYearData = _(rawData)
    .filter((i) => portfolioData.isins.includes(i.isin) && i.year === YEAR)
    .value();

  const totalRevenue = _(lastYearData)
    .sumBy((item) => item.product_category_revenues)
    .valueOf();

  const portfolioByCategory = _(lastYearData)
    .groupBy((i) => i.product_category)
    .mapValues((categoryItems) => {
      return {
        product: categoryItems[0].product_category,
        revenueShare:
          _(categoryItems).sumBy((i) => i.product_category_revenues) /
          totalRevenue,
        themesCovered: Object.values(THEME).filter((t) => categoryItems[0][t])
          .length,
      };
    })
    .flatMap()
    .value();

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current && portfolioByCategory.length > 0) {
      const svg = d3.select(svgRef.current);

      // Define chart dimensions
      const width = 700;
      const height = 300;
      const innerPadding = 5;
      const radius = Math.min(width, height) / 2 - innerPadding;
      const legendWidth = 100;

      // Outer radius scale
      const outerRadiusScale = d3
        .scaleLinear()
        .domain([0, d3.max(portfolioByCategory, (d) => d.themesCovered)!])
        .range([radius * 0.4, radius]);

      // Clear existing content
      svg.selectAll("*").remove();

      // Append grey background circle
      svg
        .append("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("r", radius)
        .attr("fill", "#374151");

      const pie = d3
        .pie<DataItem>()
        .value((d) => d.revenueShare)
        .sort(null);

      const arc = d3
        .arc<d3.PieArcDatum<DataItem>>()
        .innerRadius(radius * 0.4)
        .outerRadius((d) => outerRadiusScale(d.data!.themesCovered));

      const tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip-donut")
        .style("opacity", 0.9);

      const arcs = svg
        .selectAll(".arc")
        .data(pie(portfolioByCategory))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      arcs
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => BRIGHT_COLORS[i])
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .on("mouseover", function (event, d) {
          // Highlight sector on hover
          d3.select(this).transition().duration(50).attr("opacity", ".85");

          // Show tooltip
          tooltip.transition().duration(200).style("opacity", 1);

          tooltip
            .html(
              `${d.data.product}: ${(d.data.revenueShare * 100).toFixed(1)}%`,
            )
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 25 + "px")
            .style("position", "fixed")
            .style("text-align", "center")
            .style("width", "250px")
            .style("height", "45px")
            .style("padding", "8px")
            .style("font", "14px sans-serif")
            .style("background", "#222")
            .style("opacity", "0.85")
            .style("border", "0px")
            .style("border-radius", "8px");
        })
        .on("mouseout", function (event, d) {
          d3.select(this).transition().duration(50).attr("opacity", "1");

          tooltip.transition().duration(500).style("opacity", 0);
        });

      // Add labels
      arcs
        .append("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("fill", "white")
        .text((d) => {
          const pct = d.data!.revenueShare * 100;
          return pct > 3 && d.data.themesCovered > 0
            ? `${pct.toFixed(1)}%`
            : "";
        });

      // Legend
      const legend = svg
        .append("g")
        .attr("transform", `translate(${width - legendWidth},0)`);

      const legendItems = legend
        .selectAll(".legend-item")
        .data(portfolioByCategory)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`);

      legendItems
        .append("circle")
        .attr("cx", 8) // Center X coordinate
        .attr("cy", 8) // Center Y coordinate
        .attr("r", 8) // Radius
        .attr("fill", (d, i) => BRIGHT_COLORS[i]);

      legendItems
        .append("text")
        .attr("x", 25)
        .attr("y", 12)
        .text((d) => d.product)
        .attr("font-size", "14px")
        .attr("fill", "white");
    }
  }, [portfolioByCategory]);

  return (
    <>
      <h1 className="text-2xl">Revenue Normalized Theme Impact </h1>
      <p className="text-gray-400 text-sm mb-3">
        Segments represent the contribution of products and services to the
        company's revenue. Each segment's size corresponds to the proportion of
        revenue generated by the respective product or service.
      </p>
      <svg ref={svgRef} width={1100} height={350} id="donut-chart" />
    </>
  );
};

export default DonutChart;
