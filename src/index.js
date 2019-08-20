import { barGraph } from "./visualizations/bar_graph";
import { horizontalBar } from "./visualizations/horizontal_graph";
import { circleGraph } from "./visualizations/circle_graph";
import { circleLinear } from "./visualizations/circle_linear";
import { symetricalLine } from "./visualizations/symetrical_line";
import { symetricalCircle } from "./visualizations/symetrical_circle";
import { waveformLinear } from "./visualizations/waveform_line";
import { waveformCircle } from "./visualizations/waveform_circle";
import { fullScreen } from "./visualizations/full_screen";

import { viridisD3, plasmaD3, spectralD3, cubehelixD3, rainbowD3, 
    sinebowD3, ylOrRdD3, ylGnBuD3, greysD3 } from "./assets/colors";

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
    const largePlayIcon = document.getElementById("large-play-icon");

    const backgroundColorsTitle = document.getElementById("background-color-title");
    
    const colorsTitle = document.getElementById("colors-title");
    const visualizerTitle = document.getElementById("visualizer-title");

    const colorPicker = document.getElementById('color-picker');
    const body = document.getElementById("body");
    const colorPickerLabel = document.getElementById("color-picker-label");

    const backgroundColorHeader = document.getElementById("background-color-header");
    const leftSidebar = document.getElementById("left-sidebar");
    const rightSidebar = document.getElementById("right-sidebar");
    const footerAudioPlayer = document.getElementById("footer-audio-player");

    const hideElements = () => {
        if (!audio.paused) {
            backgroundColorHeader.style.opacity = 0;
            leftSidebar.style.opacity = 0;
            rightSidebar.style.opacity = 0;
            footerAudioPlayer.style.opacity = 0;
        }
    };

    const showElements = () => {
        backgroundColorHeader.style.opacity = "";
        leftSidebar.style.opacity = "";
        rightSidebar.style.opacity = "";
        footerAudioPlayer.style.opacity = "";
    };
 
    let timeOut = setTimeout(() => hideElements(), 4000);

    document.onmousemove = () => {
        showElements();
        clearTimeout(timeOut);
        timeOut = setTimeout(() => hideElements(), 4000);
    };

    document.onclick = () => {
        showElements();
        clearTimeout(timeOut);
        timeOut = setTimeout(() => hideElements(), 4000);
    };

    colorPicker.onchange = function () {
        body.style.backgroundColor = colorPicker.value;
        colorPickerLabel.style.backgroundColor = colorPicker.value;
    };

    const setRandomColor = () => {
        const chars = "0123456789ABCDEF";
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += chars[Math.floor(Math.random() * 16)];
        }
        colorPicker.value = color;
        body.style.backgroundColor = colorPicker.value;
        colorPickerLabel.style.backgroundColor = colorPicker.value;
    };

    backgroundColorsTitle.onclick = () => {
        setRandomColor();
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
    const ylOrRdDButton = document.getElementById('ylorrd-button');
    const ylGnBuButton = document.getElementById('ylgnbu-button');
    const greysButton = document.getElementById('greys-button');

    const colorButtons = {
        viridisD3: viridisButton,
        plasmaD3: plasmaButton,
        spectralD3: spectralButton,
        cubehelixD3: cubehelixButton,
        rainbowD3: rainbowButton,
        sinebowD3: sinebowButton,
        ylOrRdD3: ylOrRdDButton,
        ylGnBuD3: ylGnBuButton,
        greysD3: greysButton
    };

    
    const colorArr = {
        plasmaD3: plasmaD3,
        viridisD3: viridisD3,
        rainbowD3: rainbowD3,
        spectralD3: spectralD3,
        cubehelixD3: cubehelixD3,
        sinebowD3: sinebowD3,
        ylOrRdD3: ylOrRdD3,
        ylGnBuD3: ylGnBuD3,
        greysD3: greysD3
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

    const prevVisualizer = () => {
        const currentIndex = Object.keys(visualizerArr).indexOf(selectedVisualizer);
        const prevVisualizer = currentIndex === 0 ?
            Object.keys(visualizerArr)[Object.keys(visualizerArr).length - 1] :
            Object.keys(visualizerArr)[(currentIndex - 1)];
        switchVisualizer(prevVisualizer);
    };

    const nextVisualizer = () =>  {
        const currentIndex = Object.keys(visualizerArr).indexOf(selectedVisualizer);
        const nextVisualizer = Object.keys(visualizerArr)[(currentIndex + 1) % Object.keys(visualizerArr).length];
        switchVisualizer(nextVisualizer);
    };

    visualizerTitle.onclick = () => {
        nextVisualizer();
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

    const prevColor = () => {
        const currentIndex = Object.keys(colorArr).indexOf(selectedColor);
        const prevColor = currentIndex === 0 ? 
            Object.keys(colorArr)[Object.keys(colorArr).length - 1] :
            Object.keys(colorArr)[(currentIndex - 1)];
        switchColor(prevColor);
    };

    const nextColor = () => {
        const currentIndex = Object.keys(colorArr).indexOf(selectedColor);
        const nextColor = Object.keys(colorArr)[(currentIndex + 1) % Object.keys(colorArr).length];
        switchColor(nextColor);
    };

    colorsTitle.onclick = () => {
        nextColor();
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

    largePlay.onclick = () => {
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
        }

        if (e.keyCode === 87) prevVisualizer();
        if (e.keyCode === 83) nextVisualizer();
        if (e.keyCode === 38) prevColor();
        if (e.keyCode === 40) nextColor();
        if (e.keyCode === 68) setRandomColor();

    };

    audio.onpause = () => {
        playPause.classList.remove("fa-pause");
        playPause.classList.add("fa-play");
        largePlayIcon.style.opacity = 1;
        largePlayIcon.style.cursor = "pointer";
        showElements();
    };

    audio.onplay = () => {
        playPause.classList.remove("fa-play");
        playPause.classList.add("fa-pause");
        timeOut = setTimeout(() => hideElements(), 4000);
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
            largePlayIcon.style.opacity = 1;
            largePlayIcon.style.cursor = "pointer";
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