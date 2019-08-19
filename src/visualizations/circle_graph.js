export const circleGraph = function (analyser, colors) {

    analyser.fftSize = 128;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const colorScale = d3.scaleSequential(colors)
        .domain([0, dataArray.length - 1]);

    const h = window.innerHeight,
        w = window.innerWidth;

    const svg = d3.select('body').append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('id', 'visualizer-svg');

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
            .attr("stroke-width", function (d, i) { return ((w > h) ? (w / 720) : (h / 720)); });
    }
    renderFrame();
};