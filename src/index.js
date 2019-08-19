import { barGraph } from "./visualizations/bar_graph";
import { horizontalBar } from "./visualizations/horizontal_graph";
import { circleGraph } from "./visualizations/circle_graph";
import { circleLinear } from "./visualizations/circle_linear";
import { symetricalLine } from "./visualizations/symetrical_line";
import { symetricalCircle } from "./visualizations/symetrical_circle";
import { waveformLinear } from "./visualizations/waveform_line";
import { waveformCircle } from "./visualizations/waveform_circle";
import { fullScreen } from "./visualizations/full_screen";

import { viridisD3, plasmaD3, spectralD3, cubehelixD3, rainbowD3, sinebowD3 } from "./assets/colors";

import "./styles/app.scss";

window.onload = () => {

    const file = document.getElementById("file-input");
    const audio = document.getElementById("audio");
    const playPause = document.getElementById("play-pause");
    const playbar = document.getElementById("playbar");
    const progressBar = document.getElementById('playbar-progress');
    const timeProgress = document.getElementById('time-progress');
    const timeLeft = document.getElementById('time-left');
    const trackName = document.getElementById('track-name');
    const largePlay = document.getElementById('large-play');
    const largePlayContainer = document.getElementById('large-play-container');

    const colorPicker = document.getElementById('color-picker');
    const body = document.getElementById("body");
    const colorPickerLabel = document.getElementById("color-picker-label");

    colorPicker.onchange = function () {
        body.style.backgroundColor = colorPicker.value;
        colorPickerLabel.style.backgroundColor = colorPicker.value;
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

    const visualizerButtons = {
        barGraph: barGraphButton,
        horizontalBar: horizontalBarButton,
        circleGraph: circleGraphButton,
        circleLinear: circleLinearButton,
        symetricalLine: symetricalLineButton,
        symetricalCircle: symetricalCircleButton,
        waveformLinear: waveformLinearButton,
        waveformCircle: waveformCircleButton,
        fullScreen: fullScreenButton
    };

    const visualizerArr = {
        barGraph: barGraph,
        horizontalBar: horizontalBar,
        circleGraph: circleGraph,
        circleLinear: circleLinear,
        symetricalLine: symetricalLine,
        symetricalCircle: symetricalCircle,
        waveformLinear: waveformLinear,
        waveformCircle: waveformCircle,
        fullScreen: fullScreen
    };

    const viridisButton = document.getElementById('viridis-button');
    const plasmaButton = document.getElementById('plasma-button');
    const spectralButton = document.getElementById('spectral-button');
    const cubehelixButton = document.getElementById('cubehelix-button');
    const rainbowButton = document.getElementById('rainbow-button');
    const sinebowButton = document.getElementById('sinebow-button');

    const colorButtons = {
        viridisD3: viridisButton,
        plasmaD3: plasmaButton,
        spectralD3: spectralButton,
        cubehelixD3: cubehelixButton,
        rainbowD3: rainbowButton,
        sinebowD3: sinebowButton,
    };

    const colorArr = {
        viridisD3: viridisD3,
        plasmaD3: plasmaD3,
        spectralD3: spectralD3,
        cubehelixD3: cubehelixD3,
        rainbowD3: rainbowD3,
        sinebowD3: sinebowD3,
    };

    let contextCreated = false;
    let context;
    let analyser;

    let selectedVisualizer = "barGraph";
    let selectedColor = "plasmaD3";

    const createVisualizer = () => {
        removeVisualizer();
        if (contextCreated) {
            visualizerArr[selectedVisualizer](analyser, colorArr[selectedColor]);
        }
    };

    const switchVisualizer = (newVisualizer) => {
        if (selectedVisualizer !== newVisualizer) {
            visualizerButtons[selectedVisualizer].classList.remove("active-visualizer");
            selectedVisualizer = newVisualizer;
            visualizerButtons[selectedVisualizer].classList.add("active-visualizer");
            createVisualizer();
        }
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

    const switchColor = (newColor) => {
        if (selectedColor !== newColor) {
            colorButtons[selectedColor].classList.remove("active-color");
            selectedColor = newColor;
            colorButtons[selectedColor].classList.add("active-color");
            createVisualizer();
        }
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
    
    const removeVisualizer = () => {
        if (document.getElementById('visualizer-svg')) {
            document.getElementById('visualizer-svg').remove();
        }
    };

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
                largePlayContainer.innerHTML = "";

            } else {
                removeVisualizer();
                audio.pause();
                largePlayContainer.innerHTML = `<i class="fas fa-play"></i>`;
            }
        }
    };

    playPause.onclick = () => {
        switchPlayPause();
    };

    largePlay.onclick = () => {
        switchPlayPause();
    };

    document.onkeyup = (e) => {
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

    playbar.onclick = (e) => {
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

    file.onchange = function () {

        const files = this.files;

        if (files.length > 0) {

            audio.src = URL.createObjectURL(files[0]);

            playPause.classList.remove("fa-pause");
            playPause.classList.add("fa-play");
            largePlayContainer.innerHTML = `<i class="fas fa-play"></i>`;
            removeVisualizer();

            trackName.innerHTML = `<span>${files[0].name}</span>`;

            if (!contextCreated) {
                contextCreated = true;

                context = new AudioContext();
                analyser = context.createAnalyser();

                let src = context.createMediaElementSource(audio);
                src.connect(analyser);
                analyser.connect(context.destination);
            }
        }
    };
    window.onresize = () => {
        createVisualizer();
    };
};