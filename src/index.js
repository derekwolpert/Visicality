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

        const h = window.innerHeight;
        const w = window.innerWidth;

        const colorScale = d3.scaleSequential(d3.interpolateSinebow)
            .domain([0, 127]);

        const svg = d3.select('body').append('svg')
            .attr('width', w)
            .attr('height', h);

        const y = d3.scaleLinear()
            .domain([0, 255])
            .range([h, 0]);

        svg.selectAll("rect")
            .data(dataArray)
            .enter().append("rect")
            .attr("width", function(d) { return (w / dataArray.length) * (0.8); })
            .attr("height", function(d) { return (h - y(d)); })
            .attr("y", function(d) {return y(d);})
            .attr("x", function (d, i) { return ((w / dataArray.length) * i) + 0.1; });

        function renderFrame() {
            requestAnimationFrame(renderFrame);
            analyser.getByteFrequencyData(dataArray);

            svg.selectAll('rect')
                .data(dataArray)
                .attr("height", function (d) { return ((d / 255) * h); })
                .attr("y", function (d) { return y(d); })
                .attr('fill', function (d, i) { return colorScale(i); });

        }
        renderFrame();
        audio.play();
    };
};