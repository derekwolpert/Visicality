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
        analyser.fftSize = 128;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const colorScale = d3.scaleSequential(d3.interpolatePlasma)
            .domain([1, 255]);

        const margin = { top: 0, right: 0, bottom: 0, left: 0 };

        const h = window.innerHeight - margin.top - margin.bottom,
            w = window.innerWidth - margin.left - margin.right;

        const svg = d3.select('body').append('svg')
            .attr('width', w + margin.left + margin.right)
            .attr('height', h + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const y = d3.scaleLinear()
            .domain([0, 255])
            .range([h, 0]);

        svg.selectAll("rect")
            .data(dataArray)
            .enter().append("rect")
            .attr("width", function (d) { return (w / dataArray.length); })
            .attr("height", function (d) { return (h - y(d)); })
            .attr("y", function (d) { return y(d); })
            .attr("x", function (d, i) { return ((w / dataArray.length) * i); });

        function renderFrame() {
            requestAnimationFrame(renderFrame);
            analyser.getByteFrequencyData(dataArray);

            svg.selectAll('rect')
                .data(dataArray)
                .attr("height", function (d) { return ((d / 255) * h); })
                .attr("y", function (d) { return y(d); })
                .attr('fill', function (d) { return colorScale(d); })
                .attr("stroke", function (d, i) { return "black"; })
                .attr("stroke-width", function (d, i) { return 2; });
        }
        renderFrame();
        audio.play();
    };
};