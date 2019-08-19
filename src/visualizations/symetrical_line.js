export const symetricalLine = function (analyser, colors) {

    analyser.fftSize = 1024;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const h = window.innerHeight,
        w = window.innerWidth;

    const svg = d3.select('body').append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('id', 'visualizer-svg');

    const firstX = d3.scaleLinear()
        .domain([0, (dataArray.length * 2) - 1])
        .range([0, w]);

    const secondX = d3.scaleLinear()
        .domain([(dataArray.length * 2), (dataArray.length * 4) - 1])
        .range([w, 0]);


    const firstY = d3.scaleLinear()
        .domain([0, 255])
        .range([h/2, 0]);
    
    const secondY = d3.scaleLinear()
        .domain([0, 255])
        .range([h/2, h]);

    const line = d3.line()
        .x(function (d, i) { return i < (dataArray.length * 2) ? firstX(i) : secondX(i); })
        .y(function (d, i) { return i < (dataArray.length * 2) ? firstY(d): secondY(d); });


    const y = d3.scaleLinear()
        .domain([0, 255])
        .range([h, 0]);


    svg.append("g")
        .attr("id", "y axis")
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

    function renderFrame() {
        requestAnimationFrame(renderFrame);
        analyser.getByteFrequencyData(dataArray);
        setColorOffset();

        svg.selectAll("path")
            .datum([...dataArray.slice().reverse(), ...dataArray, ...dataArray.slice().reverse(), ...dataArray])
            .attr("d", line)
            .attr("stroke", function (d) { return loopingColor(colorOffset); })
            .attr("stroke-width", function (d, i) { return ((w > h) ? (w / 720) : (h / 720)); });
    }
    renderFrame();
};