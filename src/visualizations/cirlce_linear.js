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
            .domain([0, 255]);

        const margin = { top: 0, right: 0, bottom: 0, left: 0 };

        const h = window.innerHeight - margin.top - margin.bottom,
            w = window.innerWidth - margin.left - margin.right;

        const y = d3.scaleLinear()
            .domain([0, dataArray.length])
            .range([dataArray.length, 0]);

        const svg = d3.select('body').append('svg')
            .attr('width', w + margin.left + margin.right)
            .attr('height', h + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.selectAll('circle')
            .data(dataArray)
            .enter().append('circle')
            .attr('r', function (d) { return (((w > h ? h : w) / 2) * (d / 255)); })
            .attr("cx", function (d, i) { return ((w / dataArray.length) * i); })
            .attr('cy', function (d, i) { return ((h / dataArray.length) * y(i)); });

        function renderFrame() {
            requestAnimationFrame(renderFrame);
            analyser.getByteFrequencyData(dataArray);

            svg.selectAll('circle')
                .data(dataArray)
                .attr('r', function (d) { return ((((w > h ? h : w)) / 2) * (d / 255)); })
                .attr("fill", function (d, i) { return colorScale(d); })
                .attr("stroke", function (d, i) { return "rgba(0, 0, 0, 0.5)"; })
                .attr("stroke-width", function (d, i) { return 2; });
        }
        renderFrame();
        audio.play();
    };
};