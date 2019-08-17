const circleGraph = function (analyser, colors) {

    analyser.fftSize = 128;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const colorScale = d3.scaleSequential(d3.interpolatePlasma)
        .domain([0, dataArray.length - 1]);

    const margin = { top: 0, right: 0, bottom: 0, left: 0 };

    const h = window.innerHeight - margin.top - margin.bottom,
        w = window.innerWidth - margin.left - margin.right;

    const svg = d3.select('body').append('svg')
        .attr('width', w + margin.left + margin.right)
        .attr('height', h + margin.top + margin.bottom)
        .attr('id', 'visualizer-svg')
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.selectAll('circle')
        .data(dataArray)
        .enter().append('circle')
        .attr('cx', function (d) { return (w / 2); })
        .attr('cy', function (d) { return (h / 2); });

    function renderFrame() {
        requestAnimationFrame(renderFrame);
        analyser.getByteFrequencyData(dataArray);

        svg.selectAll('circle')
            .data(dataArray)
            .attr('r', function (d) { return ((((w > h ? w : h)) / 2) * (d / 255)); })
            .attr("fill", function (d, i) { return colorScale(i); })
            .attr("stroke", function (d, i) { return "black"; })
            .attr("stroke-width", function (d, i) { return ((w > h) ? (w / 960) : (h / 960)); });
    }
    renderFrame();
};