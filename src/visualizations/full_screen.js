export const fullScreen = function (analyser, colors) {

    analyser.fftSize = 1024;

    const margin = { top: 0, right: 0, bottom: 0, left: 0 };

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
        .data(dataArray)
        .enter().append("rect")
        .attr("width", function (d) { return ((w / dataArray.length) * 0.8); })
        .attr("x", function (d, i) { return ((w / (dataArray.length)) * i) + ((w / dataArray.length) * 0.1); })
        .attr("height", function (d) { return (h); })
        .attr("y", function (d) { return 0; });

    function renderFrame() {
        requestAnimationFrame(renderFrame);
        analyser.getByteFrequencyData(dataArray);

        svg.selectAll('rect')
            .data(dataArray)
            .attr('fill', function (d) { return d === 0 ? "transparent" : colorScale(d); });
    }
    renderFrame();
};