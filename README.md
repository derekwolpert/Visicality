# The Untitled Audio Visualization Project

## Background & Overview

The Untitled Audio Visualization Project (TUAVP) is an audio visualizer program utilizing the Web Audio and D3 APIs to create real-time imagery corresponding to attributes of simultaneously playing sound (e.g. the volume of the sound, the frequency of the sound, etc.).  

The program contains a limited – yet varied – collection of built-in sounds.  Users can also input their own sounds through utilizing SoundCloud’s audio API, directly uploading from their own computer, or utilizing a microphone on their own device.

TUAVP aims to create a polished visual experience influenced by the graph types available in popular spreadsheet applications.  Users are able to choose between visualizers based on bar graphs, line graphs, circle/pie graphs and more.

## Functionality & MVPs

In TUAVP users are able to:
* experience a real-time visual representation of audio
* select a graph-inspired style for the visualization of audio
* select a color palette for the visualization
* select an audio for the visualization
* play, pause and restart options for the audio

Additionally, TUAVP includes:
* a modal to house the settings for selecting a custom audio source
* links to various personal websites to learn more about the developer of the project

## Wireframe

![Wireframe Image](wireframe_proposal_image.png)

## Architecture & Technologies

TUAVP utilizes the following technologies:
* `Vanilla JavaScript`, for fundamental structure of project 
* `Web Audio API`, to extract data from selected audio
* `D3 API`, to create visually rich visuals based on data from audio 
* `Soundcloud API`, to allow users to input their own selection of audio
* `Webpack`, JavaScript bundler to assist with development and production builds

## Implementation Timeline

## Bonus Features

* Allow users to create their own custom color palettes to use with the visualizer
* Allow user to manipulate and change audio through utilization of `Web Audio API`
* Add other third-party audio APIs to the program for users, Spotify API, Apple's MusicKit JS API, etc.