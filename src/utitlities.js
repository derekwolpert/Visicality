export const formatTime = (currentTime, duration) => {
    const roundedTime = Math.floor(currentTime);
    const hours = Math.floor(roundedTime / 3600);
    const minutes = Math.floor((roundedTime - (hours * 3600)) / 60);
    const seconds = roundedTime - (hours * 3600) - (minutes * 60);
    return ((duration >= 3600 ? (hours + ":") : "") + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds));
};

export const getRandomColor = () => {
    const chars = "0123456789ABCDEF";
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += chars[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const removeVisualizer = () => {
    d3.selectAll("svg").remove();
};