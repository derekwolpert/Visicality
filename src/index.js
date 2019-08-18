import { barGraph } from "./visualizations/bar_graph";
import { horizontalBar } from "./visualizations/horizontal_graph";
import { circleGraph } from "./visualizations/circle_graph";
import { circleLinear } from "./visualizations/circle_linear";
import { symetricalLine } from "./visualizations/symetrical_line";
import { symetricalCircle } from "./visualizations/symetrical_circle";
import { waveformLinear } from "./visualizations/waveform_line";
import { waveformCircle } from "./visualizations/waveform_circle";
import { fullScreen } from "./visualizations/full_screen";

import { plasmaD3, viridisD3, spectralD3, rainbowD3, cubeHelixD3 } from "./assets/colors";

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

    const barGraphButton = document.getElementById('bar-graph-button');
    const horizontalBarButton = document.getElementById('horizontal-bar-button');
    const circleGraphButton = document.getElementById('circle-graph-button');
    const circleLinearButton = document.getElementById('circle-linear-button');
    const symetricalLineButton = document.getElementById('symetrical-line-button');
    const symetricalCircleButton = document.getElementById('symetrical-circle-button');
    const waveformLinearButton = document.getElementById('waveform-linear-button');
    const waveformCircleButton = document.getElementById('waveform-circle-button');
    const fullScreenButton = document.getElementById('full-screen-button');

    let contextCreated = false;
    let context;
    let analyser;

    let selectedVisualizer = barGraph;

    const createVisualizer = () => {
        removeVisualizer();
        if (contextCreated) {
            selectedVisualizer(analyser, spectralD3);
        }
    };

    barGraphButton.onclick = () => {
        if (selectedVisualizer !== barGraph) {
            selectedVisualizer = barGraph;
            createVisualizer();
        }
    };
    horizontalBarButton.onclick = () => {
        if (selectedVisualizer !== horizontalBar) {
            selectedVisualizer = horizontalBar;
            createVisualizer();
        }
    };
    circleGraphButton.onclick = () => {
        if (selectedVisualizer !== circleGraph) {
            selectedVisualizer = circleGraph;
            createVisualizer();
        }
    };
    circleLinearButton.onclick = () => {
        if (selectedVisualizer !== circleLinear) {
            selectedVisualizer = circleLinear;
            createVisualizer();
        }
    };
    symetricalLineButton.onclick = () => {
        if (selectedVisualizer !== symetricalLine) {
            selectedVisualizer = symetricalLine;
            createVisualizer();
        }
    };
    symetricalCircleButton.onclick = () => {
        if (selectedVisualizer !== symetricalCircle) {
            selectedVisualizer = symetricalCircle;
            createVisualizer();
        }
    };
    waveformLinearButton.onclick = () => {
        if (selectedVisualizer !== waveformLinear) {
            selectedVisualizer = waveformLinear;
            createVisualizer();
        }
    };
    waveformCircleButton.onclick = () => {
        if (selectedVisualizer !== waveformCircle) {
            selectedVisualizer = waveformCircle;
            createVisualizer();
        }
    };
    fullScreenButton.onclick = () => {
        if (selectedVisualizer !== fullScreen) {
            selectedVisualizer = fullScreen;
            createVisualizer();
        }
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
            } else {
                audio.pause();
            }
        }
    };


    playPause.onclick = () => {
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

        playPause.classList.remove("fa-pause");
        playPause.classList.add("fa-play");

        const files = this.files;
        audio.src = URL.createObjectURL(files[0]);

        trackName.innerHTML = `<span>${files[0].name}</span>`;

        if (!contextCreated) {
            contextCreated = true;

            context = new AudioContext();
            analyser = context.createAnalyser();

            let src = context.createMediaElementSource(audio);
            src.connect(analyser);
            analyser.connect(context.destination);
        }
    };

    window.onresize = () => {
        createVisualizer();
    };
};