import { returnAnimationStatus } from '../utitlities'

import { scaleSequential, selectAll, select } from 'd3'

export const fullScreen = function (analyser, colors) {
  analyser.fftSize = 512

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

  const dataArray = new Uint8Array(analyser.frequencyBinCount)

  const colorScale = scaleSequential(colors)
    .domain([1, 255])

  svg.selectAll('rect')
    .data(dataArray)
    .enter().append('rect')
    .attr('width', (w / dataArray.length) * 0.8)
    .attr('x', function (d, i) { return ((w / (dataArray.length)) * i) + ((w / dataArray.length) * 0.1) })
    .attr('height', h)
    .attr('y', 0)

  let currentCount = 0
  currentCount += returnAnimationStatus()

  function renderFrame () {
    if (currentCount === returnAnimationStatus()) {
      requestAnimationFrame(renderFrame)
    }
    analyser.getByteFrequencyData(dataArray)

    svg.selectAll('rect')
      .data(dataArray)
      .attr('fill', function (d) { return d === 0 ? 'transparent' : colorScale(d) })
  }
  renderFrame()
}
