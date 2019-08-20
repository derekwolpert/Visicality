export const barGraph = function (analyser, colors) {

    analyser.fftSize = 512;

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
        .attr("width", function (d) { return (w / dataArray.length) * 0.8; })
        .attr("x", function (d, i) { return (((w / dataArray.length) * i) + ((w / dataArray.length) * 0.1)); });

    function renderFrame() {
        requestAnimationFrame(renderFrame);
        analyser.getByteFrequencyData(dataArray);
        svg.selectAll('rect')
            .data(dataArray)
            .attr("height", function (d) { return (h - y(d)); })
            .attr("y", function (d) { return y(d); })
            .attr('fill', function (d) { return d === 0 ? "black" : colorScale(d); });
    }
    renderFrame();
};