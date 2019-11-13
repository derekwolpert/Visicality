# vi·si·cal·i·ty (visual + musicality)
![Visualizer Options](demo_pic_1.gif)

## Background & Overview
Visicality is a music visualizer web application utilizing Web Audio API and D3.js to create real-time imagery corresponding to attributes of simultaneously playing audio.  Users are able to select a local audio files from their own device to use with this application.

Visicality offers users a highly customizable experience through a diverse selection of visualizer designs and color palettes.  Addtionally, users are able to adjust the colors and direction of the background color gradient.

[vi·si·cal·i·ty is currently live at visicality.derekwolpert.com - Click Here to check it out for yourself!](https://visicality.derekwolpert.com "vi·si·cal·i·ty")

**Note:** For best compatibility please use Visicality with a desktop version of Google Chrome. With other web browsers some features may not be available. While this project's UI / UX is optimized for desktop browsers, it is also compatible with mobile devices that support Web Audio API.

![Color Options](demo_pic_2.gif)

## Architecture & Technologies

Visicality utilizes the following technologies:
* `Vanilla JavaScript`, for the fundamental structure of project 
* `Web Audio API`, for persistent processing of audio files, and extraction of frequency and waveform data
* `D3.js Library`, to meticulously craft and render a collection of widely distinct visualizers
* `Webpack`, a JavaScript bundler to assist with development and production builds
* `Fullscreen API`, to seemlessly enter in-and-out of a full-screen mode while in browser

![Background Color Examples](demo_pic_3.gif)

### Additional Features:

* A polished audio player stored at the bottom of the application allows users to interact with:
    * A play/pause button
    * A file input button to select a locally stored audio file
    * Various information about the selected audio file including the file's name, how many minutes have progressed in playback, and how many minutes are left
    * A progress bar to show the current position of the audio's playback, as well as allowing the adjustment of the audio's current position when clicked
    * A button to enter in and out of a full-screen mode with usage of Fullscreen API
* The ablity to adjust the gain (volume) of audio through Web Audio API's GainNode interface, and see the adjustments reflected accordingly in visualizations
* A robust set of on-screen controls and keyboard shortcuts, to adjust audio playback and visualizer settings
* An intuitive, stylized, and responsive UI/UX, which automatically hides when audio is playing and no mouse movement is detected
* Wide usage of tooltips when hovering over content, to offer explainations on what actions occur when clicking specific areas
* Two modals - one offering an informational overview of the project, and another explaining the various keyboard shortcuts
* A dynamic favicon that automatically adjusts to match the currently background color gradient in the application

## Wireframe Proposal vs Final Layout

![Wireframe Proposal Image](wireframe_proposal_image.png)

![Final Layout Image](final_layout_image.png)

## Potential Features to Implement in the Future
* Further real-time manipulation of audio through Web Audio API
* Usage of a user's microphone for real-time audio input
* Custom color palettes for visualizer
* Utilize third-party audio APIs (i.e. Spotify API, Apple's MusicKit JS API, etc.) to allow users select audio from souces other than their local device
* Brief educational component to explore the science of sound, and how it is reflected in the visualizations