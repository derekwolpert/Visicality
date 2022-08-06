import { scaleSequential, selectAll, select, scaleLinear } from 'd3'
import { returnAnimationStatus } from '../utitlities'

export const horizontalBar = function (analyser, colors) {
  analyser.fftSize = 256

  const dataArray = new Uint8Array(analyser.frequencyBinCount)

  const dataLength = dataArray.length * 2

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

  const width = scaleLinear()
    .domain([0, 255])
    .range([0, w])

  const y = scaleLinear()
    .domain([0, ((dataLength) - 1)])
    .range([((dataLength) - 1), 0])

  const symmetricalData = new Uint8Array(dataLength)

  svg.selectAll('rect')
    .data(symmetricalData)
    .enter().append('rect')
    .attr('height', (h / (dataLength)) * 0.8)
    .attr('y', function (d, i) { return (((h / (dataLength) * y(i)))) + ((h / (dataLength)) * 0.1) })

  let currentCount = 0
  currentCount += returnAnimationStatus()

  function renderFrame () {
    if (currentCount === returnAnimationStatus()) {
      requestAnimationFrame(renderFrame)
    }
    analyser.getByteFrequencyData(dataArray)

    svg.selectAll('rect')
      .data([...dataArray.slice().reverse(), ...dataArray])
      .attr('width', function (d) { return (width(d)) })
      .attr('x', function (d) { return ((w / 2) - (width(d) / 2)) })
      .attr('fill', function (d) { return d === 0 ? 'black' : colorScale(d) })
  }
  renderFrame()
}
