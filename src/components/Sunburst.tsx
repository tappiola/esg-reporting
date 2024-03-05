import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DataItem {
  product: string;
  revenueShare: number;
  themesCovered: number;
}

const DonutChart: React.FC<{ data: DataItem[] }> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current && data.length > 0) {
      const svg = d3.select(svgRef.current);

      // Define chart dimensions
      const width = 700;
      const height = 300;
      const radius = Math.min(width, height) / 2;
      const backgroundRadius = 150;
      const legendWidth = 100;

      // Define color scale
      const colors = ["#ff7f0e", "#1f77b4", "#2ca02c"];

      // Outer radius scale
      const outerRadiusScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.themesCovered)!])
        .range([radius * 0.5, radius]);

      // Clear existing content
      svg.selectAll("*").remove();

      // Append grey background circle
      svg
        .append("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("r", backgroundRadius)
        .attr("fill", "#1f2937");

      const pie = d3
        .pie<DataItem>()
        .value((d) => d.revenueShare)
        .sort(null);

      const arc = d3
        .arc<d3.PieArcDatum<DataItem>>()
        .innerRadius(radius * 0.4)
        .outerRadius((d) => outerRadiusScale(d.data!.themesCovered));

      const arcs = svg
        .selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      arcs
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => colors[i])
        .attr("stroke", "white")
        .style("stroke-width", "2px");

      // Add labels
      arcs
        .append("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("fill", "white")
        .text((d) => `${d.data!.revenueShare}%`);

      // Legend
      const legend = svg
        .append("g")
        .attr("transform", `translate(${width - legendWidth},0)`);

      const legendItems = legend
        .selectAll(".legend-item")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`);

      legendItems
        .append("circle")
        .attr("cx", 8) // Center X coordinate
        .attr("cy", 8) // Center Y coordinate
        .attr("r", 8) // Radius
        .attr("fill", (d, i) => colors[i]);

      legendItems
        .append("text")
        .attr("x", 25)
        .attr("y", 12)
        .text((d) => d.product)
        .attr("font-size", "14px")
        .attr("fill", "white");
    }
  }, [data]);

  return <svg ref={svgRef} width={700} height={300} id="donut-chart" />;
};

export default DonutChart;
