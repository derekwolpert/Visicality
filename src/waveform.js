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
        const dataArray = new Float32Array(analyser.fftSize);

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

        const x = d3.scaleLinear()
            .domain([0, dataArray.length])
            .range([0, w]);

        const y = d3.scaleLinear()
            .domain([-1, 1])
            .range([h, 0]);

        const line = d3.line()
            .x(function (d, i) { return x(i); })
            .y(function (d, i) { return y(d); })
            .curve(d3.curveCatmullRom.alpha(0.5));

        // svg.append("g")
        //     .attr("class", "x axis")
        //     .attr("transform", "translate(0," + h/2 + ")")
        //     .call(d3.axisBottom(x));

        // svg.append("g")
        //     .attr("class", "y axis")
        //     .call(d3.axisLeft(y));


        function renderFrame() {
            requestAnimationFrame(renderFrame);
            analyser.getFloatTimeDomainData(dataArray);

            svg.select("path")
                .datum(dataArray)
                .attr("d", line)
                .attr("stroke", function (d, i) { return "white"; })
                .attr("stroke-width", function (d, i) { return 2; });

        }
        renderFrame();
        audio.play();
    };
};