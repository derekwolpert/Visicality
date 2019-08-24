export const circleLinear = function (analyser, colors) {

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

    const y = d3.scaleLinear()
        .domain([0, dataArray.length])
        .range([dataArray.length, 0]);

    svg.selectAll('circle')
        .data(dataArray)
        .enter().append('circle')
        .attr("cx", function (d, i) { return ((w / dataArray.length) * i); })
        .attr('cy', function (d, i) { return ((h / dataArray.length) * y(i)); });
        
    function renderFrame() {
        requestAnimationFrame(renderFrame);
        analyser.getByteFrequencyData(dataArray);

        svg.selectAll('circle')
            .data(dataArray)
            .attr('r', function (d) { return ((((w > h ? h : w)) / 2) * (d / 255)); })
            .attr("fill", function (d, i) { return d === 0 ? "black" : colorScale(d); });
    }
    renderFrame();
};