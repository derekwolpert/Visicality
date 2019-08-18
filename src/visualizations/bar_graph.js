export const barGraph = function (analyser, colors) {

    analyser.fftSize = 128;

    const h = window.innerHeight,
        w = window.innerWidth;

    const svg = d3.select('body').append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('id', 'visualizer-svg');
        
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const colorScale = d3.scaleSequential(colors)
        .domain([1, 255]);

    const y = d3.scaleLinear()
        .domain([0, 255])
        .range([h, 0]);

    svg.selectAll("rect")
        .data([...dataArray, ...dataArray.slice().reverse()])
        .enter().append("rect")
        .attr("width", function (d) { return (w / (dataArray.length * 2)); })
        .attr("x", function (d, i) { return ((w / (dataArray.length * 2)) * i); });

    function renderFrame() {
        requestAnimationFrame(renderFrame);
        analyser.getByteFrequencyData(dataArray);

        svg.selectAll('rect')
            .data([...dataArray.slice().reverse(), ...dataArray])
            .attr("height", function (d) { return (h - y(d)); })
            .attr("y", function (d) { return y(d); })
            .attr('fill', function (d) { return colorScale(d); })
            .attr("stroke", function (d, i) { return "black"; })
            .attr("stroke-width", function (d, i) { return ((w / (dataArray.length * 2)) * 0.2); });
    }
    renderFrame();
};