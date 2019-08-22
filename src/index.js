import { barGraph } from "./visualizations/bar_graph";
import { horizontalBar } from "./visualizations/horizontal_graph";
import { circleGraph } from "./visualizations/circle_graph";
import { circleLinear } from "./visualizations/circle_linear";
import { symetricalLine } from "./visualizations/symetrical_line";
import { symetricalCircle } from "./visualizations/symetrical_circle";
import { waveformLinear } from "./visualizations/waveform_line";
import { waveformCircle } from "./visualizations/waveform_circle";
import { fullScreen } from "./visualizations/full_screen";

import "./styles/app.scss";

window.onload = () => {

    const audio = document.getElementById("audio");
    const playPause = document.getElementById("play-pause");
    const progressBar = document.getElementById('playbar-progress');
    const timeProgress = document.getElementById('time-progress');
    const timeLeft = document.getElementById('time-left');
    const largePlayIcon = document.getElementById("large-play-icon");
    const gainBarValue = document.getElementById("gain-bar-value");
    const colorPicker1 = document.getElementById('color-picker-1');
    const colorPicker2 = document.getElementById('color-picker-2');
    const colorPicker3 = document.getElementById('color-picker-3');

    const colorPickerLabel1 = document.getElementById("color-picker-label-1");
    const colorPickerLabel2 = document.getElementById("color-picker-label-2");
    const colorPickerLabel3 = document.getElementById("color-picker-label-3");

    const body = document.getElementById("body");
    const backgroundColorHeader = document.getElementById("background-color-header");
    const leftSidebar = document.getElementById("left-sidebar");
    const rightSidebar = document.getElementById("right-sidebar");
    const footerAudioPlayer = document.getElementById("footer-audio-player");
    const rightGainBar = document.getElementById("right-gain-bar");
    const favicon = document.getElementById('favicon');

    const hideElements = () => {
        if (!audio.paused) {
            backgroundColorHeader.style.opacity = 0;
            leftSidebar.style.opacity = 0;
            rightSidebar.style.opacity = 0;
            footerAudioPlayer.style.opacity = 0;
            rightGainBar.style.opacity = 0;
        }
    };

    const showElements = () => {
        backgroundColorHeader.style.opacity = "";
        leftSidebar.style.opacity = "";
        rightSidebar.style.opacity = "";
        footerAudioPlayer.style.opacity = "";
        rightGainBar.style.opacity = "";
    };
 
    let timeOut = setTimeout(() => hideElements(), 3000);

    document.onmousemove = () => {
        showElements();
        clearTimeout(timeOut);
        timeOut = setTimeout(() => hideElements(), 3000);
    };

    document.onclick = () => {
        showElements();
        clearTimeout(timeOut);
        timeOut = setTimeout(() => hideElements(), 3000);
    };

    colorPicker1.onchange = function () {
        setNewColors();
    };

    colorPicker2.onchange = function () {
        setNewColors();
    };

    colorPicker3.onchange = function () {
        setNewColors();
    };

    const changeFaviconColor = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;

        const faviconColor = canvas.getContext('2d');
        const img = document.createElement('img');
        img.src = favicon.href;

        img.onload = () => {
            faviconColor.drawImage(img, 0, 0, 32, 32);
            faviconColor.beginPath();
            faviconColor.arc(16, 16, 16, 0, 2 * Math.PI);

            let gradient = faviconColor.createLinearGradient(0, 32, 32, 0);
            gradient.addColorStop(0, colorPicker1.value);
            gradient.addColorStop(0.5, colorPicker2.value);
            gradient.addColorStop(1, colorPicker3.value);

            faviconColor.fillStyle = gradient;
            faviconColor.fill();
            favicon.href = canvas.toDataURL('image/png');
        };
    };

    const getRandomColor = () => {
        const chars = "0123456789ABCDEF";
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += chars[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const setRandomColors = () => {
        colorPicker1.value = getRandomColor();
        colorPicker2.value = getRandomColor();
        colorPicker3.value = getRandomColor();
    };

    const setNewColors = () => {

        colorPickerLabel1.style.backgroundColor = colorPicker1.value;
        colorPickerLabel2.style.backgroundColor = colorPicker2.value;
        colorPickerLabel3.style.backgroundColor = colorPicker3.value;

        body.style.backgroundColor = colorPicker1.value;
        body.style.backgroundImage = `linear-gradient(to right top, ${colorPicker1.value}, ${colorPicker2.value}, ${colorPicker3.value})`;

        changeFaviconColor();
    };

    document.getElementById("background-color-title").onclick = () => {
        setRandomColors();
        setNewColors();
    };
    
    const barGraphButton = document.getElementById('bar-graph-button');
    const horizontalBarButton = document.getElementById('horizontal-bar-button');
    const circleGraphButton = document.getElementById('circle-graph-button');
    const circleLinearButton = document.getElementById('circle-linear-button');
    const symetricalLineButton = document.getElementById('symetrical-line-button');
    const symetricalCircleButton = document.getElementById('symetrical-circle-button');
    const waveformLinearButton = document.getElementById('waveform-linear-button');
    const waveformCircleButton = document.getElementById('waveform-circle-button');
    const fullScreenButton = document.getElementById('full-screen-button');

    const visualizerObj = {
        barGraph: { 
            button: barGraphButton, 
            visualizer: barGraph, 
            prev: "fullScreen", 
            next: "horizontalBar",
        },
        horizontalBar: { 
            button: horizontalBarButton, 
            visualizer: horizontalBar,
            prev: "barGraph",
            next: "circleGraph",
        },
        circleGraph: { 
            button: circleGraphButton, 
            visualizer: circleGraph,
            prev: "horizontalBar",
            next: "circleLinear",
        },
        circleLinear: { 
            button: circleLinearButton, 
            visualizer: circleLinear,
            prev: "circleGraph",
            next: "symetricalLine",
        },
        symetricalLine: { 
            button: symetricalLineButton, 
            visualizer: symetricalLine,
            prev: "circleLinear",
            next: "symetricalCircle",
        },
        symetricalCircle: { 
            button: symetricalCircleButton, 
            visualizer: symetricalCircle,
            prev: "symetricalLine",
            next: "waveformLinear",
        },
        waveformLinear: { 
            button: waveformLinearButton, 
            visualizer: waveformLinear,
            prev: "symetricalCircle",
            next: "waveformCircle",
        },
        waveformCircle: { 
            button: waveformCircleButton, 
            visualizer: waveformCircle,
            prev: "waveformLinear",
            next: "fullScreen",
        },
        fullScreen: { 
            button: fullScreenButton, 
            visualizer: fullScreen,
            prev: "waveformCircle",
            next: "barGraph",
        }
    };

    const viridisButton = document.getElementById('viridis-button');
    const plasmaButton = document.getElementById('plasma-button');
    const spectralButton = document.getElementById('spectral-button');
    const cubehelixButton = document.getElementById('cubehelix-button');
    const rainbowButton = document.getElementById('rainbow-button');
    const sinebowButton = document.getElementById('sinebow-button');
    const ylOrRdDButton = document.getElementById('ylorrd-button');
    const ylGnBuButton = document.getElementById('ylgnbu-button');
    const greysButton = document.getElementById('greys-button');

    const colorObj = {
        plasmaD3: {
            button: plasmaButton,
            color: d3.interpolatePlasma,
            prev: "greysD3",
            next: "viridisD3",
        },
        viridisD3: {
            button: viridisButton,
            color: d3.interpolateViridis,
            prev: "plasmaD3",
            next: "rainbowD3",
        },
        rainbowD3: {
            button: rainbowButton,
            color: d3.interpolateRainbow,
            prev: "viridisD3",
            next: "spectralD3",
        },
        spectralD3: {
            button: spectralButton,
            color: d3.interpolateSpectral,
            prev: "rainbowD3",
            next: "cubehelixD3",
        },
        cubehelixD3: {
            button: cubehelixButton,
            color: d3.interpolateCubehelixDefault,
            prev: "spectralD3",
            next: "sinebowD3",
        },
        sinebowD3: {
            button: sinebowButton,
            color: d3.interpolateSinebow,
            prev: "cubehelixD3",
            next: "ylOrRdD3",
        },
        ylOrRdD3: {
            button: ylOrRdDButton,
            color: d3.interpolateYlOrRd,
            prev: "sinebowD3",
            next: "ylGnBuD3",
        },
        ylGnBuD3: {
            button: ylGnBuButton,
            color: d3.interpolateYlGnBu,
            prev: "ylOrRdD3",
            next: "greysD3",
        },
        greysD3: {
            button: greysButton,
            color: d3.interpolateGreys,
            prev: "ylGnBuD3",
            next: "plasmaD3",
        }
    };

    let selectedVisualizer = "barGraph";
    let selectedColor = "plasmaD3";

    const createVisualizer = () => {
        removeVisualizer();
        if (contextCreated && !audio.paused) {
            visualizerObj[selectedVisualizer].visualizer(analyser, colorObj[selectedColor].color);
        }
    };

    const switchVisualizer = (newVisualizer) => {
        if (selectedVisualizer !== newVisualizer) {
            visualizerObj[selectedVisualizer].button.classList.remove("active-visualizer");
            selectedVisualizer = newVisualizer;
            visualizerObj[selectedVisualizer].button.classList.add("active-visualizer");
            createVisualizer();
        }
    };

    const prevVisualizer = () => {
        switchVisualizer(visualizerObj[selectedVisualizer].prev);
    };
    const nextVisualizer = () => {
        switchVisualizer(visualizerObj[selectedVisualizer].next);
    };

    barGraphButton.onclick = () => {
        switchVisualizer("barGraph");
    };
    horizontalBarButton.onclick = () => {
        switchVisualizer("horizontalBar");
    };
    circleGraphButton.onclick = () => {
        switchVisualizer("circleGraph");
    };
    circleLinearButton.onclick = () => {
        switchVisualizer("circleLinear");
    };
    symetricalLineButton.onclick = () => {
        switchVisualizer("symetricalLine");
    };
    symetricalCircleButton.onclick = () => {
        switchVisualizer("symetricalCircle");
    };
    waveformLinearButton.onclick = () => {
        switchVisualizer("waveformLinear");
    };
    waveformCircleButton.onclick = () => {
        switchVisualizer("waveformCircle");
    };
    fullScreenButton.onclick = () => {
        switchVisualizer("fullScreen");
    };
    
    const removeVisualizer = () => {
        if (document.getElementById('visualizer-svg')) {
            document.getElementById('visualizer-svg').remove();
        }
    };

    document.getElementById("visualizer-title").onclick = () => {
        nextVisualizer();
    };

    const switchColor = (newColor) => {
        if (selectedColor !== newColor) {
            colorObj[selectedColor].button.classList.remove("active-color");
            selectedColor = newColor;
            colorObj[selectedColor].button.classList.add("active-color");
            createVisualizer();
        }
    };

    const prevColor = () => {
        switchColor(colorObj[selectedColor].prev);
    };
    const nextColor = () => {
        switchColor(colorObj[selectedColor].next);
    };

    viridisButton.onclick = () => {
        switchColor("viridisD3");
    };
    plasmaButton.onclick = () => {
        switchColor("plasmaD3");
    };
    spectralButton.onclick = () => {
        switchColor("spectralD3");
    };
    cubehelixButton.onclick = () => {
        switchColor("cubehelixD3");
    };
    rainbowButton.onclick = () => {
        switchColor("rainbowD3");
    };
    sinebowButton.onclick = () => {
        switchColor("sinebowD3");
    };
    ylOrRdDButton.onclick = () => {
        switchColor("ylOrRdD3");
    };
    ylGnBuButton.onclick = () => {
        switchColor("ylGnBuD3");
    };
    greysButton.onclick = () => {
        switchColor("greysD3");
    };

    document.getElementById("colors-title").onclick = () => {
        nextColor();
    };

    let AudioContext = window.AudioContext || window.webkitAudioContext;

    let contextCreated = false;
    let context;
    let analyser;
    let gain;

    const updateDisplayTime = () => {
        progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
        timeProgress.innerHTML = `<span>${formatTime(audio.currentTime)}</span>`;
        timeLeft.innerHTML = `<span>${formatTime(audio.duration - audio.currentTime)}</span>`;
    };

    const switchPlayPause = () => {
        if (context) {
            if (audio.paused) {
                createVisualizer();
                audio.play();
                largePlayIcon.style.opacity = "";
                largePlayIcon.style.cursor = "";
            } else {
                audio.pause();
                largePlayIcon.style.opacity = 1;
                largePlayIcon.style.cursor = "pointer";
            }
        }
    };

    playPause.onclick = () => {
        switchPlayPause();
    };

    document.getElementById('large-play').onclick = () => {
        switchPlayPause();
    };

    document.onkeyup = (e) => {
        e.preventDefault();
        if (audio.src !== "") {

            if (e.keyCode == 32) {
                switchPlayPause();
            }
            if (e.keyCode == 37) {
                if (audio.currentTime < 5) {
                    audio.currentTime = 0;
                } else {
                    audio.currentTime -= 5;
                }
                updateDisplayTime();
            }
            if (e.keyCode == 39) {
                if (audio.duration - audio.currentTime < 5) {
                    audio.currentTime = audio.duration;
                } else {
                    audio.currentTime += 5;
                }
                updateDisplayTime();
            }
            if (e.keyCode === 38) {
                if (gain.gain.value < 0.9) {
                    updateGain(gain.gain.value + 0.1);
                } else if (gain.gain.value !== 1) {
                    updateGain(1);
                }
            }

            if (e.keyCode === 40) {
                if (gain.gain.value > 0.1) {
                    updateGain(gain.gain.value - 0.1);
                } else if (gain.gain.value !== 0) {
                    updateGain(0);
                }
            }   
        }
        if (e.keyCode === 65) prevColor();
        if (e.keyCode === 69) {
            setRandomColors();
            setNewColors();
        }
        if (e.keyCode === 68) nextColor();
        if (e.keyCode === 87) prevVisualizer();
        if (e.keyCode === 83) nextVisualizer();
    };

    const updateGain = (value) => {
        gain.gain.value = value;
        gainBarValue.style.width = `${193 * value}px`;
    };

    document.getElementById("gain-bar").onclick = (e) => {
        if (context) {
            const bounds = e.currentTarget.getBoundingClientRect();
            const percent = ((e.clientX - (bounds.left)) / bounds.width);
            updateGain(percent);
        }
    };

    document.getElementById("gain-title").onclick = () => {
        if (gain.gain.value !== 0) {
            updateGain(0);
        } else {
            updateGain(1);
        }
    };

    audio.onpause = () => {
        playPause.classList.remove("fa-pause");
        playPause.classList.add("fa-play");
        largePlayIcon.style.opacity = 1;
        largePlayIcon.style.cursor = "pointer";
        removeVisualizer();
        showElements();
    };

    audio.onplay = () => {
        playPause.classList.remove("fa-play");
        playPause.classList.add("fa-pause");
        createVisualizer();
        timeOut = setTimeout(() => hideElements(), 3000);
    };

    document.getElementById("playbar").onclick = (e) => {
        if (audio.src !== "") {
            const bounds = e.currentTarget.getBoundingClientRect();
            const percent = ((e.clientX - (bounds.left)) / bounds.width);
            audio.currentTime = (percent * audio.duration);
            progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
            updateDisplayTime();
        }
    };

    const formatTime = (time) => {
        const roundedTime = Math.floor(time);
        const hours = Math.floor(roundedTime / 3600);
        const minutes = Math.floor((roundedTime - (hours * 3600)) / 60);
        const seconds = roundedTime - (hours * 3600) - (minutes * 60);
        return ((audio.duration >= 3600 ? (hours + ":") : "") + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds));
    };

    setInterval(() => {
        if (audio.src !== "")  {
            updateDisplayTime();
        } else {
            timeProgress.innerHTML = "";
            timeLeft.innerHTML = "";
            progressBar.style.width = "0%";
        } 
    }, 1000);

    document.getElementById("file-input").onchange = function () {

        const files = this.files;

        if (files.length > 0) {

            audio.src = URL.createObjectURL(files[0]);
            audio.load();

            playPause.classList.remove("fa-pause");
            playPause.classList.add("fa-play");
            largePlayIcon.style.opacity = 1;
            largePlayIcon.style.cursor = "pointer";
            removeVisualizer();

            document.getElementById('track-name').innerHTML = `<span>${files[0].name}</span>`;

            if (!contextCreated) {
                contextCreated = true;

                context = new AudioContext();
                analyser = context.createAnalyser();
                analyser.minDecibels = -105;
                analyser.maxDecibels = -25;
                analyser.smoothingTimeConstant = 0.85;

                gain = context.createGain();

                let src = context.createMediaElementSource(audio);

                src.connect(gain);
                gain.connect(analyser);
                analyser.connect(context.destination);
            }
        }
    };
    window.onresize = () => {
        createVisualizer();
    };
};