import { scaleSequential, selectAll, select, scaleLinear, axisLeft, line as d3Line } from 'd3'

import { returnAnimationStatus } from '../utitlities'

export const waveformLinear = function (analyser, colors) {
  analyser.fftSize = 2048

  const dataArray = analyser.getFloatTimeDomainData ? new Float32Array(analyser.fftSize) : [...Array(analyser.fftSize)].map(el => 0)

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

  const x = scaleLinear()
    .domain([0, dataArray.length - 1])
    .range([0, w])

  const y = scaleLinear()
    .domain([-1, 1])
    .range([h, 0])

  const line = d3Line()
    .x(function (d, i) { return x(i) })
    .y(function (d) { return y(d) })

  svg.append('g')
    .attr('class', 'y axis')
    .call(axisLeft(y))
    .attr('color', 'transparent')

  const colorScale = scaleSequential(colors)
    .domain([0, 299])

  const mirrorColorScale = scaleSequential(colors)
    .domain([599, 300])

  const loopingColor = (num) => {
    return num < 300 ? colorScale(num) : mirrorColorScale(num)
  }

  let colorOffset = 0

  const setColorOffset = () => {
    colorOffset = (colorOffset + 1) % 600
  }

  let currentCount = 0
  currentCount += returnAnimationStatus()

  function renderFrame () {
    if (currentCount === returnAnimationStatus()) {
      requestAnimationFrame(renderFrame)
    }

    setColorOffset()

    if (analyser.getFloatTimeDomainData) {
      analyser.getFloatTimeDomainData(dataArray)

      svg.select('path')
        .datum(dataArray)
        .attr('d', line)
        .attr('stroke', loopingColor(colorOffset))
        .attr('stroke-width', w / 360)
    } else {
      selectAll('svg text').remove()

      svg.append('text')
        .text('Waveform Lines visualizer utilizes a Web Audio API')
        .attr('y', (h * (9 / 20)))
        .attr('x', w / 2)
        .attr('text-anchor', 'middle')
        .attr('font-size', w / 48)
        .attr('font-family', '"Open Sans", sans-serif')
        .attr('opacity', 0.8)
        .attr('fill', loopingColor(colorOffset))
        .attr('stroke', 'black')
        .attr('stroke-width', w * 0.0005)

      svg.append('text')
        .text('method not compatible with your web browser.')
        .attr('y', (h * (9 / 20)) + (w / 48) + 6)
        .attr('x', w / 2)
        .attr('text-anchor', 'middle')
        .attr('font-size', w / 48)
        .attr('font-family', '"Open Sans", sans-serif')
        .attr('opacity', 0.8)
        .attr('fill', loopingColor(colorOffset))
        .attr('stroke', 'black')
        .attr('stroke-width', w * 0.0005)

      svg.append('text')
        .text('Please select a different visualizer, or consider using Google Chrome,')
        .attr('y', (h * (9 / 20)) + (2 * (w / 48)) + 18)
        .attr('x', w / 2)
        .attr('text-anchor', 'middle')
        .attr('font-size', w / 56)
        .attr('font-family', '"Open Sans", sans-serif')
        .attr('opacity', 0.8)
        .attr('fill', loopingColor(colorOffset))
        .attr('stroke', 'black')
        .attr('stroke-width', w * 0.0003)

      svg.append('text')
        .text('Microsoft Edge, Mozilla Firefox or Opera for wider compatiblity.')
        .attr('y', (h * (9 / 20)) + (2 * (w / 48)) + (w / 56) + 24)
        .attr('x', w / 2)
        .attr('text-anchor', 'middle')
        .attr('font-size', w / 56)
        .attr('font-family', '"Open Sans", sans-serif')
        .attr('opacity', 0.8)
        .attr('fill', loopingColor(colorOffset))
        .attr('stroke', 'black')
        .attr('stroke-width', w * 0.0003)
    }
  }
  renderFrame()
}
