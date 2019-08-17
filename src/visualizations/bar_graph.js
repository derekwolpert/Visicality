const barGraph = function (analyser, colors) {

    analyser.fftSize = 512;

    const margin = { top: 0, right: 0, bottom: 0, left: 0 };

    const h = window.innerHeight - margin.top - margin.bottom,
        w = window.innerWidth - margin.left - margin.right;

    const svg = d3.select('body').append('svg')
        .attr('width', w + margin.left + margin.right)
        .attr('height', h + margin.top + margin.bottom)
        .attr('id', 'visualizer-svg')
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const colorScale = d3.scaleSequential(d3.interpolatePlasma)
        .domain([1, 255]);

    const y = d3.scaleLinear()
        .domain([0, 255])
        .range([h, 0]);

    svg.selectAll("rect")
        .data(dataArray)
        .enter().append("rect")
        .attr("width", function (d) { return (w / dataArray.length); })
        .attr("x", function (d, i) { return ((w / dataArray.length) * i); });

    function renderFrame() {
        requestAnimationFrame(renderFrame);
        analyser.getByteFrequencyData(dataArray);

        svg.selectAll('rect')
            .data(dataArray)
            .attr("height", function (d) { return (h - y(d)); })
            .attr("y", function (d) { return y(d); })
            .attr('fill', function (d) { return colorScale(d); })
            .attr("stroke", function (d, i) { return "black"; })
            .attr("stroke-width", function (d, i) { return ((w / (dataArray.length * 2)) * 0.2); });
    }
    renderFrame();
};