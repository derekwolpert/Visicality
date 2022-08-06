import { scaleSequential, selectAll, select, scaleLinear } from 'd3'

import { returnAnimationStatus } from '../utitlities'

export const circleLinear = function (analyser, colors) {
  analyser.fftSize = 128

  const dataArray = new Uint8Array(analyser.frequencyBinCount)

  const colorScale = scaleSequential(colors)
    .domain([1, 255])

  const h = window.innerHeight
  const w = window.innerWidth

  let svg

  if (document.getElementById('visualizer-svg')) {
    selectAll('svg > *').remove()
  } else {
    selectAll('svg').remove()
    svg = select('body').append('svg')
      .attr('width', w)
      .attr('height', h)
      .attr('id', 'visualizer-svg')
  }

  const y = scaleLinear()
    .domain([0, dataArray.length])
    .range([dataArray.length, 0])

  svg.selectAll('circle')
    .data(dataArray)
    .enter().append('circle')
    .attr('cx', function (d, i) { return ((w / dataArray.length) * i) })
    .attr('cy', function (d, i) { return ((h / dataArray.length) * y(i)) })

  let currentCount = 0
  currentCount += returnAnimationStatus()

  function renderFrame () {
    if (currentCount === returnAnimationStatus()) {
      requestAnimationFrame(renderFrame)
    }
    analyser.getByteFrequencyData(dataArray)

    svg.selectAll('circle')
      .data(dataArray)
      .attr('r', function (d) { return ((((w > h ? h : w)) / 2) * (d / 255)) })
      .attr('fill', function (d) { return d === 0 ? 'black' : colorScale(d) })
  }
  renderFrame()
}
