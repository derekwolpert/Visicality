export const horizontalBar = function (analyser, colors) {

    analyser.fftSize = 128;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const colorScale = d3.scaleSequential(colors)
        .domain([1, 255]);

    const h = window.innerHeight,
        w = window.innerWidth;

    const svg = d3.select('body').append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('id', 'visualizer-svg');

    const width = d3.scaleLinear()
        .domain([0, 255])
        .range([0, w]);

    const y = d3.scaleLinear()
        .domain([0, ((dataArray.length * 2) - 1)])
        .range([((dataArray.length * 2) - 1), 0]);

    const symmetricalData = new Uint8Array(dataArray.length * 2);

    svg.selectAll("rect")
        .data(symmetricalData)
        .enter().append("rect")
        .attr("height", function (d) { return (h / (dataArray.length * 2)); })
        .attr("y", function (d, i) { return (((h / (dataArray.length * 2) * y(i)))); });

    function renderFrame() {
        requestAnimationFrame(renderFrame);
        analyser.getByteFrequencyData(dataArray);

        svg.selectAll('rect')
            .data([...dataArray.slice().reverse(), ...dataArray])
            .attr("width", function (d) { return (width(d)); })
            .attr("x", function (d) { return ((w / 2) - (width(d) / 2)); })
            .attr('fill', function (d) { return colorScale(d); })
            .attr("stroke", function (d, i) { return "black"; })
            .attr("stroke-width", function (d, i) { return ((h / (dataArray.length * 2)) * 0.2); });
    }
    renderFrame();
};