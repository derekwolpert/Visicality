const visualization = function (analyser) {

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const colorScale = d3.scaleSequential(d3.interpolatePlasma)
        .domain([1, 255]);

    const margin = { top: 0, right: 0, bottom: 0, left: 0 };

    const h = window.innerHeight - margin.top - margin.bottom,
        w = window.innerWidth - margin.left - margin.right;

    const svg = d3.select('body').append('svg')
        .attr('width', w + margin.left + margin.right)
        .attr('height', h + margin.top + margin.bottom)
        .attr('id', 'visualizer-svg')
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const width = d3.scaleLinear()
        .domain([0, 255])
        .range([0, w]);

    const y = d3.scaleLinear()
        .domain([0, dataArray.length])
        .range([dataArray.length, 0]);

    svg.selectAll("rect")
        .data(dataArray)
        .enter().append("rect")
        .attr("height", function (d) { return (h / dataArray.length); })
        .attr("y", function (d, i) { return (((h / dataArray.length) * y(i))); });

    function renderFrame() {
        requestAnimationFrame(renderFrame);
        analyser.getByteFrequencyData(dataArray);

        svg.selectAll('rect')
            .data(dataArray)
            .attr("width", function (d) { return (width(d)); })
            .attr("x", function (d) { return ((w / 2) - (width(d) / 2)); })
            .attr('fill', function (d) { return colorScale(d); })
            .attr("stroke", function (d, i) { return "black"; })
            .attr("stroke-width", function (d, i) { return 2; });
    }
    renderFrame();
};