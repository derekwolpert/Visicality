import { scaleSequential, selectAll, select, scaleLinear, axisLeft, lineRadial as d3LineRadial } from 'd3'
import { returnAnimationStatus } from '../utitlities'

export const symetricalCircle = function (analyser, colors) {
  analyser.fftSize = 1024

  const dataArray = new Uint8Array(analyser.frequencyBinCount)

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
      .append('g')
      .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')')
  }
  const y = scaleLinear()
    .domain([255, -255])
    .range([0, h])

  svg.append('g')
    .attr('id', 'y axis')
    .call(axisLeft(y))
    .attr('color', 'transparent')

  const angle = scaleLinear()
    .domain([0, (dataArray.length * 4) - 1])
    .range([Math.PI, (Math.PI * 5)])

  const outerRadius = scaleLinear()
    .domain([-255, 255])
    .range([0, (w > h) ? (h / 2) : (w / 2)])

  const innerRadius = scaleLinear()
    .domain([-255, 255])
    .range([(w > h) ? (h / 2) : (w / 2), 0])

  const lineRadial = d3LineRadial()
    .radius(function (d, i) { return i < (dataArray.length * 2) ? (outerRadius(d)) : (innerRadius(d)) })
    .angle(function (d, i) { return (angle(i)) })

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
    analyser.getByteFrequencyData(dataArray)

    setColorOffset()

    svg.selectAll('path')
      .datum([...dataArray.slice().reverse(), ...dataArray, ...dataArray.slice().reverse(), ...dataArray])
      .attr('d', lineRadial)
      .attr('fill', loopingColor(colorOffset))
      .attr('stroke', 'black')
      .attr('stroke-width', (w > h) ? (w / 960) : (h / 960))
  }
  renderFrame()
}
