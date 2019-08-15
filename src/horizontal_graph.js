import "./styles/app.scss";

window.onload = () => {

    const file = document.getElementById("file-input");
    const audio = document.getElementById("audio");

    file.onchange = function () {
        const files = this.files;
        audio.src = URL.createObjectURL(files[0]);

        const context = new AudioContext();
        const analyser = context.createAnalyser();

        let src = context.createMediaElementSource(audio);
        src.connect(analyser);
        analyser.connect(context.destination);
        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const colorScale = d3.scaleSequential(d3.interpolatePlasma)
            .domain([1, 255]);

        const margin = { top: 10, right: 10, bottom: 10, left: 10 };

        const h = window.innerHeight - margin.top - margin.bottom,
            w = window.innerWidth - margin.left - margin.right;

        const svg = d3.select('body').append('svg')
            .attr('width', w + margin.left + margin.right)
            .attr('height', h + margin.top + margin.bottom)
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
            .attr("width", function (d) { return (width(d)); })
            .attr("height", function (d) { return (h / dataArray.length); })
            .attr("y", function (d, i) { return (((h / dataArray.length) * y(i))); })
            .attr("x", function (d) { return ((w / 2) - (width(d) / 2)); });

        function renderFrame() {
            requestAnimationFrame(renderFrame);
            analyser.getByteFrequencyData(dataArray);

            svg.selectAll('rect')
                .data(dataArray)
                .attr("width", function (d) { return (width(d)); })
                .attr("x", function (d) { return ((w / 2) - (width(d) / 2)); })
                .attr('fill', function (d) { return colorScale(d); })
                .attr('stroke', function (d) { return "black"; })
                .attr("stroke-width", function (d) { return 2; });
        }
        renderFrame();
        audio.play();
    };
};