import { returnAnimationStatus } from '../utitlities'

import { selectAll, select, scaleSequential, scaleLinear } from 'd3'

export const barGraph = function (analyser, colors) {
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

  const y = scaleLinear()
    .domain([0, 255])
    .range([h, 0])

  svg.selectAll('rect')
    .data(dataArray)
    .enter().append('rect')
    .attr('width', ((w / dataArray.length) * 0.8))
    .attr('x', function (d, i) { return (((w / dataArray.length) * i) + ((w / dataArray.length) * 0.1)) })

  let currentCount = 0
  currentCount += returnAnimationStatus()

  function renderFrame () {
    if (currentCount === returnAnimationStatus()) {
      requestAnimationFrame(renderFrame)
    }
    analyser.getByteFrequencyData(dataArray)

    svg.selectAll('rect')
      .data(dataArray)
      .attr('height', function (d) { return (h - y(d)) })
      .attr('y', function (d) { return y(d) })
      .attr('fill', function (d) { return d === 0 ? 'black' : colorScale(d) })
  }
  renderFrame()
}
