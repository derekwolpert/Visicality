# The Untitled Audio Visualization Project

## Background & Overview

The Untitled Audio Visualization Project (TUAVP) is an audio visualizer program utilizing the Web Audio and D3 APIs to create real-time imagery corresponding to attributes of simultaneously playing audio (e.g. the volume of the audio, the frequencies of the audio, etc.).  

The program contains a limited – yet varied – collection of built-in sounds.  Users can also input their own sounds through utilizing SoundCloud’s audio API, directly uploading from their own computer, or utilizing a microphone on their own device.

TUAVP aims to create a polished visual experience influenced by the graph seen in popular spreadsheet applications.  Users are able to choose between visualizers based on bar graphs, line graphs, circle/pie graphs and more.

## Functionality & MVPs

In TUAVP users are able to:
* Experience a real-time visual representation of audio
* Select a graph-inspired style for the visualization of audio
* Select a color palette for the visualization
* Select an audio for the visualization
* Play, pause and restart options for the audio

Additionally, TUAVP includes:
* A modal to house the settings for selecting a custom audio source
* Links to various personal websites to learn more about the developer of the project

## Wireframe

![Wireframe Image](wireframe_proposal_image.png)

## Architecture & Technologies

TUAVP utilizes the following technologies:
* `Vanilla JavaScript`, for fundamental structure of project 
* `Web Audio API`, to extract data from selected audio
* `D3 API`, to create visually rich visuals based on data from audio 
* `SoundCloud API`, to allow users to input their own selection of audio
* `Webpack`, JavaScript bundler to assist with development and production builds

## Implementation Timeline

### Day 1
* Setup project's folder/file structure
* Create general visual layout of program
* Initial research/experiment with `Web Audio API` and `D3 API` get a better understanding of how these two APIs can be used together
* Research SoundCloud API to confirm whether or not it is practical to use as a third-party audio source

### Day 2
* Add component to store audio, and create basic play/pause/restart functionality to control audio in project's header
* Continue research/experiment `Web Audio API` with goal to get a solid understanding of how to extrapolate frequency/volume data from audio

### Day 3

* Explore `D3 API` resources to narrow down type of data visualization that would work best for project
* Spend no more than 30 mins picking out an initial color palette and audio file to use for testing purposes
* Build out `Web Audio API` and `D3 API` integration

### Day 4
* Expand `D3 API` data representations selection
* Expand color palettes selection
* Work on custom user inputted audio (SoundCloud, direct upload, microphone)

### Weekend
* Expand audio selection
* CSS polish magic
* Test for problems
* Deploy on GitHub

## Bonus Features

* Allow users to create their own custom color palettes to use with the visualizer
* Allow user to manipulate and change audio through utilization of `Web Audio API`
* Add other third-party audio APIs to the program for users, Spotify API, Apple's MusicKit JS API, etc.
* Brief educational component to explore the science of sound
* Allow users to take screenshots when pausing audio playback
