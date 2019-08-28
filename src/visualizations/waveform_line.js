import { returnAnimationStatus } from "../utitlities";

export const waveformLinear = function (analyser, colors) {

    analyser.fftSize = 2048;

    const dataArray = new Float32Array(analyser.fftSize);

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

    const x = d3.scaleLinear()
        .domain([0, dataArray.length - 1])
        .range([0, w]);

    const y = d3.scaleLinear()
        .domain([-1, 1])
        .range([h, 0]);

    const line = d3.line()
        .x(function (d, i) { return x(i); })
        .y(function (d, i) { return y(d); });

    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y))
        .attr("color", "transparent");

    const colorScale = d3.scaleSequential(colors)
        .domain([0, 299]);

    const mirrorColorScale = d3.scaleSequential(colors)
        .domain([599, 300]);

    const loopingColor = (num) => {
        return num < 300 ? colorScale(num) : mirrorColorScale(num);
    };

    let colorOffset = 0;

    const setColorOffset = () => {
        colorOffset = (colorOffset + 1) % 600;
    };

    let currentCount = 0;
    currentCount += returnAnimationStatus();

    function renderFrame() {

        if (currentCount === returnAnimationStatus()) {
            requestAnimationFrame(renderFrame);
        }
        analyser.getFloatTimeDomainData(dataArray);
        setColorOffset();

        svg.select("path")
            .datum(dataArray)
            .attr("d", line)
            .attr("stroke", function (d) { return loopingColor(colorOffset); })
            .attr("stroke-width", function (d) { return w / 360; });
    }
    renderFrame();
};