import "./styles/app.scss";

window.onload = () => {

    const file = document.getElementById("file-input");
    const audio = document.getElementById("audio");
    const playPause = document.getElementById("play-pause");
    const playbar = document.getElementById("playbar");

    playPause.onclick = function () {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    };

    audio.onpause = () => {
        playPause.classList.remove("fa-pause");
        playPause.classList.add("fa-play");
    };

    audio.onplay = () => {
        playPause.classList.remove("fa-play");
        playPause.classList.add("fa-pause");
    };

    playbar.onclick = function (e) {
        const bounds = e.currentTarget.getBoundingClientRect();
        const percent = ((e.clientX - (bounds.left)) / bounds.width);
        audio.currentTime = (percent * audio.duration);
    }

    let contextCreated = false;
    let context;
    let analyser;

    const formatTime = (time) => {
        const roundedTime = Math.floor(time);
        const hours = Math.floor(roundedTime / 3600);
        const minutes = Math.floor((roundedTime - (hours * 3600)) / 60);
        const seconds = roundedTime - (hours * 3600) - (minutes * 60);
        return ((audio.duration >= 3600 ? (hours + ":") : "") + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds));
    };

    setInterval(function () {
        if (audio.duration)  {
            document.getElementById('time-progress').innerHTML = `<span>${formatTime(audio.currentTime)}</span>`;
            document.getElementById('time-left').innerHTML = `<span>${formatTime(audio.duration - audio.currentTime)}</span>`;
        } else {
            document.getElementById('time-progress').innerHTML = "";
            document.getElementById('time-left').innerHTML = "";
        }
        document.getElementById('playbar-progress').style.width = `${(audio.currentTime / audio.duration) * 100}%`;
        
    }, 1000);

    file.onchange = function () {
        const files = this.files;
        audio.src = URL.createObjectURL(files[0]);

        document.getElementById('track-name').innerHTML = `<span>${files[0].name}</span>`;

        audio.play();

        if (!contextCreated) {
            contextCreated = true;

            context = new AudioContext();
            analyser = context.createAnalyser();

            let src = context.createMediaElementSource(audio);
            src.connect(analyser);
            analyser.connect(context.destination);
            var gainNode = context.createGain();
            gainNode.gain.value = 1;
            debugger
        }

        if (document.getElementById('visualizer-svg')) {
            document.getElementById('visualizer-svg').remove();
        }
        visualization(analyser);
    };

    window.onresize = function () {
        if (document.getElementById('visualizer-svg')) {
            document.getElementById('visualizer-svg').remove();
        }
        if (contextCreated) {
            visualization(analyser);
        }
    };

    const visualization = function (analyser) {

        analyser.fftSize = 2048;

        const dataArray = new Float32Array(analyser.fftSize);

        const margin = { top: 0, right: 0, bottom: 0, left: 0 };

        const h = window.innerHeight - margin.top - margin.bottom,
            w = window.innerWidth - margin.left - margin.right;

        const svg = d3.select('body').append('svg')
            .attr('width', w + margin.left + margin.right)
            .attr('height', h + margin.top + margin.bottom)
            .attr('id', 'visualizer-svg')
            .append("g")
            .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')');

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
            .range([0, (w > h) ? (h / 2) : (w / 2)]);

        const lineRadial = d3.lineRadial()
            .radius(function (d, i) { return (radius(d)); })
            .angle(function (d, i) { return (angle(i)); });

        // https://github.com/politiken-journalism/scale-color-perceptual
        // used for rgb codes below

        const plasmaHexes = [
            "#0d0887", "#100788", "#130789", "#16078a", "#19068c", "#1b068d", "#1d068e",
            "#20068f", "#220690", "#240691", "#260591", "#280592", "#2a0593", "#2c0594",
            "#2e0595", "#2f0596", "#310597", "#330597", "#350498", "#370499", "#38049a",
            "#3a049a", "#3c049b", "#3e049c", "#3f049c", "#41049d", "#43039e", "#44039e",
            "#46039f", "#48039f", "#4903a0", "#4b03a1", "#4c02a1", "#4e02a2", "#5002a2",
            "#5102a3", "#5302a3", "#5502a4", "#5601a4", "#5801a4", "#5901a5", "#5b01a5",
            "#5c01a6", "#5e01a6", "#6001a6", "#6100a7", "#6300a7", "#6400a7", "#6600a7",
            "#6700a8", "#6900a8", "#6a00a8", "#6c00a8", "#6e00a8", "#6f00a8", "#7100a8",
            "#7201a8", "#7401a8", "#7501a8", "#7701a8", "#7801a8", "#7a02a8", "#7b02a8",
            "#7d03a8", "#7e03a8", "#8004a8", "#8104a7", "#8305a7", "#8405a7", "#8606a6",
            "#8707a6", "#8808a6", "#8a09a5", "#8b0aa5", "#8d0ba5", "#8e0ca4", "#8f0da4",
            "#910ea3", "#920fa3", "#9410a2", "#9511a1", "#9613a1", "#9814a0", "#99159f",
            "#9a169f", "#9c179e", "#9d189d", "#9e199d", "#a01a9c", "#a11b9b", "#a21d9a",
            "#a31e9a", "#a51f99", "#a62098", "#a72197", "#a82296", "#aa2395", "#ab2494",
            "#ac2694", "#ad2793", "#ae2892", "#b02991", "#b12a90", "#b22b8f", "#b32c8e",
            "#b42e8d", "#b52f8c", "#b6308b", "#b7318a", "#b83289", "#ba3388", "#bb3488",
            "#bc3587", "#bd3786", "#be3885", "#bf3984", "#c03a83", "#c13b82", "#c23c81",
            "#c33d80", "#c43e7f", "#c5407e", "#c6417d", "#c7427c", "#c8437b", "#c9447a",
            "#ca457a", "#cb4679", "#cc4778", "#cc4977", "#cd4a76", "#ce4b75", "#cf4c74",
            "#d04d73", "#d14e72", "#d24f71", "#d35171", "#d45270", "#d5536f", "#d5546e",
            "#d6556d", "#d7566c", "#d8576b", "#d9586a", "#da5a6a", "#da5b69", "#db5c68",
            "#dc5d67", "#dd5e66", "#de5f65", "#de6164", "#df6263", "#e06363", "#e16462",
            "#e26561", "#e26660", "#e3685f", "#e4695e", "#e56a5d", "#e56b5d", "#e66c5c",
            "#e76e5b", "#e76f5a", "#e87059", "#e97158", "#e97257", "#ea7457", "#eb7556",
            "#eb7655", "#ec7754", "#ed7953", "#ed7a52", "#ee7b51", "#ef7c51", "#ef7e50",
            "#f07f4f", "#f0804e", "#f1814d", "#f1834c", "#f2844b", "#f3854b", "#f3874a",
            "#f48849", "#f48948", "#f58b47", "#f58c46", "#f68d45", "#f68f44", "#f79044",
            "#f79143", "#f79342", "#f89441", "#f89540", "#f9973f", "#f9983e", "#f99a3e",
            "#fa9b3d", "#fa9c3c", "#fa9e3b", "#fb9f3a", "#fba139", "#fba238", "#fca338",
            "#fca537", "#fca636", "#fca835", "#fca934", "#fdab33", "#fdac33", "#fdae32",
            "#fdaf31", "#fdb130", "#fdb22f", "#fdb42f", "#fdb52e", "#feb72d", "#feb82c",
            "#feba2c", "#febb2b", "#febd2a", "#febe2a", "#fec029", "#fdc229", "#fdc328",
            "#fdc527", "#fdc627", "#fdc827", "#fdca26", "#fdcb26", "#fccd25", "#fcce25",
            "#fcd025", "#fcd225", "#fbd324", "#fbd524", "#fbd724", "#fad824", "#fada24",
            "#f9dc24", "#f9dd25", "#f8df25", "#f8e125", "#f7e225", "#f7e425", "#f6e626",
            "#f6e826", "#f5e926", "#f5eb27", "#f4ed27", "#f3ee27", "#f3f027", "#f2f227",
            "#f1f426", "#f1f525", "#f0f724", "#f0f921"
        ];

        const plasmaLoop = plasmaHexes.concat(plasmaHexes.slice().reverse());

        let colorOffset = 0;

        function setColorOffset() {
            colorOffset = (colorOffset + 1) % plasmaLoop.length;
        }

        function renderFrame() {

            requestAnimationFrame(renderFrame);
            analyser.getFloatTimeDomainData(dataArray);
            setColorOffset();

            svg.select("path")
                .datum(dataArray)
                .attr("d", lineRadial)
                .attr("stroke", function (d, i) { return plasmaLoop[colorOffset]; })
                .attr("stroke-width", function (d, i) { return ((w > h) ? (w / 480) : (h / 480)); });
        }
        renderFrame();
    };
};