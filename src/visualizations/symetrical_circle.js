export const symetricalCircle = function (analyser, colors) {

    analyser.fftSize = 512;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const h = window.innerHeight,
        w = window.innerWidth;

    const svg = d3.select('body').append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('id', 'visualizer-svg')
        .append("g")
        .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')');

    const y = d3.scaleLinear()
        .domain([255, -255])
        .range([0, h]);

    svg.append("g")
        .attr("id", "y axis")
        .call(d3.axisLeft(y))
        .attr("color", "transparent");

    const angle = d3.scaleLinear()
        .domain([0, (dataArray.length * 4) - 1])
        .range([Math.PI, (Math.PI * 5)]);

    const outerRadius = d3.scaleLinear()
        .domain([-255, 255])
        .range([0, (w > h) ? (h / 2) : (w / 2)]);

    const innerRadius = d3.scaleLinear()
        .domain([-255, 255])
        .range([(w > h) ? (h / 2) : (w / 2), 0]);

    const lineRadial = d3.lineRadial()
        .radius(function (d, i) { return i < (dataArray.length * 2) ? (outerRadius(d)) : (innerRadius(d)); })
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

    function renderFrame() {

        requestAnimationFrame(renderFrame);
        analyser.getByteFrequencyData(dataArray);
        setColorOffset();

        svg.selectAll("path")
            .datum([...dataArray.slice().reverse(), ...dataArray, ...dataArray.slice().reverse(), ...dataArray])
            .attr("d", lineRadial)
            .attr("fill", function (d) { return loopingColor(colorOffset); })
            .attr("stroke", function (d) { return "black"; })
            .attr("stroke-width", function (d, i) { return ((w > h) ? (w / 720) : (h / 720)); });

    }
    renderFrame();
};