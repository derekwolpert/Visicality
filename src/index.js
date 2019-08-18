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
        if (audio.src !== "") {
            const bounds = e.currentTarget.getBoundingClientRect();
            const percent = ((e.clientX - (bounds.left)) / bounds.width);
            audio.currentTime = (percent * audio.duration);
            progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
            timeProgress.innerHTML = `<span>${formatTime(audio.currentTime)}</span>`;
            timeLeft.innerHTML = `<span>${formatTime(audio.duration - audio.currentTime)}</span>`;
        }
    };

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
            timeProgress.innerHTML = `<span>${formatTime(audio.currentTime)}</span>`;
            timeLeft.innerHTML = `<span>${formatTime(audio.duration - audio.currentTime)}</span>`;
        } else {
            timeProgress.innerHTML = "";
            timeLeft.innerHTML = "";
        }
        progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
        
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
            var gainNode = context.createGain();
            gainNode.gain.value = 1;
        }

        if (document.getElementById('visualizer-svg')) {
            document.getElementById('visualizer-svg').remove();
        }
        fullScreen(analyser, plasmaD3);
    };

    window.onresize = function () {
        if (document.getElementById('visualizer-svg')) {
            document.getElementById('visualizer-svg').remove();
        }
        if (contextCreated) {
            fullScreen(analyser, plasmaD3);
        }
    };
};