import { returnAnimationStatus } from "../utitlities";

export const waveformCircle = function (analyser, colors) {

    analyser.fftSize = 2048;

    const dataArray = !!analyser.getFloatTimeDomainData ? new Float32Array(analyser.fftSize) : [...Array(analyser.fftSize)].map(el => 0);

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
            .attr('id', 'visualizer-svg')
            .append("g")
            .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')');
    }

    const y = d3.scaleLinear()
        .domain([1, -1])
        .range([0, h]);

    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y))
        .attr("color", "transparent");

    const angle = d3.scaleLinear()
        .domain([0, dataArray.length - 1])
        .range([Math.PI, (Math.PI * 3)]);

    const radius = d3.scaleLinear()
        .domain([-1, 1])
        .range([0, (w > h) ? (w / 2) : (h / 2)]);

    const lineRadial = d3.lineRadial()
        .radius(function (d, i) { return (radius(d)); })
        .angle(function (d, i) { return (angle(i)); });

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

        if (!!analyser.getFloatTimeDomainData) {
            if (currentCount === returnAnimationStatus()) {
                requestAnimationFrame(renderFrame);
            }
            analyser.getFloatTimeDomainData(dataArray);
            setColorOffset();

            svg.select("path")
                .datum(dataArray)
                .attr("d", lineRadial)
                .attr("stroke", function (d, i) { return loopingColor(colorOffset); })
                .attr("stroke-width", function (d, i) { return ((w > h) ? (w / 360) : (h / 360)); });
        } else {
            svg.append("text")
                .text("Waveform Circles visualizer utilizes a Web Audio API")
                .attr("y", 0)
                .attr("x", 0)
                .attr("text-anchor", "middle")
                .attr("font-size", w / 42)
                .attr("font-family", `"Open Sans", sans-serif`)
                .attr("opacity", 0.8)
                .attr("fill", "white")
                .attr("stroke", "black")
                .attr("stroke-width", w * 0.0005);

            svg.append("text")
                .text("method not compatible with your web browser.")
                .attr("y", (w / 42) + 6)
                .attr("x", 0)
                .attr("text-anchor", "middle")
                .attr("font-size", w / 42)
                .attr("font-family", `"Open Sans", sans-serif`)
                .attr("opacity", 0.8)
                .attr("fill", "white")
                .attr("stroke", "black")
                .attr("stroke-width", w * 0.0005);

            svg.append("text")
                .text("Please select a different visualizer, or consider using Google Chrome,")
                .attr("y", (2 * (w / 42)) + 18)
                .attr("x", 0)
                .attr("text-anchor", "middle")
                .attr("font-size", w / 48)
                .attr("font-family", `"Open Sans", sans-serif`)
                .attr("opacity", 0.8)
                .attr("fill", "white")
                .attr("stroke", "black")
                .attr("stroke-width", w * 0.0003);

            svg.append("text")
                .text("Microsoft Edge, Mozilla Firefox or Opera for wider compatiblity.")
                .attr("y", (2 * (w / 42)) + (w / 48) + 24)
                .attr("x", 0)
                .attr("text-anchor", "middle")
                .attr("font-size", w / 48)
                .attr("font-family", `"Open Sans", sans-serif`)
                .attr("opacity", 0.8)
                .attr("fill", "white")
                .attr("stroke", "black")
                .attr("stroke-width", w * 0.0003);
        }
    }
    renderFrame();
};