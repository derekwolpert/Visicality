import { returnAnimationStatus } from "../utitlities";

export const circleGraph = function (analyser, colors) {

    analyser.fftSize = 256;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const colorScale = d3.scaleSequential(colors)
        .domain([0, dataArray.length - 1]);

    const h = window.innerHeight,
        w = window.innerWidth;

    let svg;

    if (document.getElementById('visualizer-svg')) {
        d3.selectAll("svg > *").remove();
    } else {
        d3.selectAll("svg").remove();
        svg = d3.select('body').append('svg')
            .attr('width', w)
            .attr('height', h)
            .attr('id', 'visualizer-svg');
    }

    svg.selectAll('circle')
        .data(dataArray)
        .enter().append('circle')
        .attr('cx', (w / 2))
        .attr('cy', (h / 2));

    let currentCount = 0;
    currentCount += returnAnimationStatus();

    function renderFrame() {

        if (currentCount === returnAnimationStatus()) {
            requestAnimationFrame(renderFrame);
        }
        analyser.getByteFrequencyData(dataArray);

        svg.selectAll('circle')
            .data(dataArray)
            .attr('r', function (d) { return ((((w > h ? h : w)) / 2) * (d / 255)); })
            .attr("fill", function (d, i) { return colorScale(i); });
    }
    renderFrame();
};