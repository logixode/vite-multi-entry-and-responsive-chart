export default function LineChart(val) {
  this.init(val)  
  this.render()

  let _this = this
  window.addEventListener("resize", function() {    
    _this.init(val)
    _this.render()
  })
}

LineChart.prototype.init = function(val) {
  this.canvas = val.target
  this.xAxis = val.xAxis ?? [0] // array of string / array of int
  this.xAxisIsNumber = typeof this.xAxis[0] == 'number'
  this.data = val.data // array of obj
  this.highestValue = Math.max(...this.data.map(val => {
    return Math.max(...val.value)
  }))
  this.maxX = this.xAxisIsNumber ? (val.maxX ?? this.data[0].value.length) : 100
  this.maxY = val.maxY ?? this.highestValue
  this.gapX = this.xAxisIsNumber ? val.gapX : Math.floor(this.maxX / this.xAxis.length)
  this.gapY = val.gapY
  this.gapY = val.gapY
  this.padding = val.padding

  this.tickSize = 5
  this.axisColor = "#555"
  this.pointRadius = 5
  this.font = "12pt Calibri"
  this.fontHeight = 12
     
  this.context = this.canvas.getContext("2d")
  this.pxGapY = Math.round(this.maxY / this.gapY)
  this.zeroPointX = this.chartWidth() + this.padding * 2
  this.zeroPointY = this.padding * 2
  this.canvas.width = this.canvas.parentElement.clientWidth
  this.width = this.canvas.width - this.zeroPointX - this.padding * 2
  this.height = this.canvas.height - this.zeroPointY - this.padding * 2 - this.fontHeight
  this.scaleX = this.width / this.maxX
  this.scaleY = this.height / this.maxY

  console.log('chart', this.maxX)
  console.log('zeroPointY', this.zeroPointY)
  console.log('width', this.width)
  console.log('scaleX', this.scaleX)
  console.log('scaleY', this.scaleY)
  console.log('canvas-width', this.canvas.width)
  console.log('chart-width', this.chartWidth())
}

LineChart.prototype.render = function() {
  console.log('redraw');
  // draw x y axis and tick marks  
  this.drawXAxis()
  this.drawYAxis()

  this.data.forEach(item => {
    this.drawLine(item.value, item.color, item.lineWidth)
  })
}

LineChart.prototype.chartWidth = function() {
  this.context.font = this.font
  let widthPerChar = 0
  for (let n = 0; n <= this.pxGapY; n++) {
    let value = this.maxY - (n * this.gapY)
    widthPerChar = Math.max(widthPerChar, this.context.measureText(value).width)
  }
  return widthPerChar
}

LineChart.prototype.drawXAxis = function() {
  let context = this.context
  context.save()
  context.beginPath()
  context.moveTo(
    this.zeroPointX, 
    this.zeroPointY + this.height
  )
  context.lineTo(
    this.zeroPointX + this.width + this.fontHeight, 
    this.zeroPointY + this.height
  )
  context.strokeStyle = this.axisColor
  context.lineWidth = 2
  context.stroke()

  // draw tick marks
  for (let i = 0; i < this.maxX / this.gapX-1; i++) {
    const pointX = this.gapX *(i+1)
    context.beginPath()
    context.moveTo(
      pointX * this.scaleX + this.zeroPointX - this.fontHeight,
      this.zeroPointY + this.height + this.tickSize
    )
    context.lineTo(
      pointX * this.scaleX + this.zeroPointX - this.fontHeight,
      this.zeroPointY + this.height - this.tickSize
    )
    context.stroke()
  }

  // draw labels  
  context.font = this.font
  context.fillStyle = "black"
  context.textAlign = "center"
  context.textBaseline = "middle"

  for (let i = 0; i < this.maxX / this.gapX+1; i++) {
    const pointX = this.gapX *(i+1)
    context.save()
    context.translate(
      pointX * this.scaleX + this.zeroPointX - this.fontHeight,
      this.zeroPointY + this.height + this.padding
    )
    if(this.xAxisIsNumber) {
      context.fillText(pointX, 0, 0)
    } else {
      context.fillText(this.xAxis[i] ?? '', 0, 0)
    }
    context.restore()
  }
  context.restore()
}

LineChart.prototype.drawYAxis = function() {
  let context = this.context
  context.save()
  context.save()
  context.beginPath()
  context.moveTo(
    this.zeroPointX, 
    this.zeroPointY
  )
  context.lineTo(
    this.zeroPointX, 
    this.zeroPointY + this.height
  )
  context.strokeStyle = this.axisColor
  context.lineWidth = 2
  context.stroke()
  context.restore()

  // draw tick marks  
  for (let i = 0; i <= this.maxY / this.gapY; i++) {
    const pointY = Math.round(this.maxY - i * this.maxY / this.pxGapY);
    if (pointY != 0) {
      context.beginPath()
      context.moveTo(
        this.zeroPointX - this.tickSize, 
        i * this.height / this.pxGapY + this.zeroPointY
      )
      context.lineTo(
        this.zeroPointX + this.tickSize, 
        i * this.height / this.pxGapY + this.zeroPointY
      )
      context.stroke()
    }
  }

  // draw values  
  context.font = this.font
  context.fillStyle = "black"
  context.textAlign = "right"
  context.textBaseline = "middle"

  for (let i = 0; i <= this.maxY / this.gapY; i++) {
    const pointY = Math.round(this.maxY - i * this.maxY / this.pxGapY);
    context.save()
    context.translate(
      this.zeroPointX - this.fontHeight, 
      i * this.height / this.pxGapY + this.zeroPointY
    )
    context.fillText(pointY, 0, 0)
    context.restore()
  }
  context.restore()
}

LineChart.prototype.drawLine = function(data, color, width) {
  let context = this.context
  context.save()
  context.lineWidth = width
  context.strokeStyle = color
  context.fillStyle = color
  context.beginPath()
  context.moveTo(
    this.zeroPointY + this.chartWidth(), 
    this.zeroPointY + this.height
  )

  data.forEach((pointY, i) => {
    const pointX = this.gapX *(i+1)
    const x = this.zeroPointY + this.chartWidth() + (pointX * this.scaleX - this.fontHeight)
    const y = this.zeroPointY + this.height + (pointY * -this.scaleY)
    context.lineTo(x, y)
    context.stroke()
    context.closePath()

    context.beginPath()
    // context.fillText(`x: ${x}`, x+10, y-10)
    // context.fillText(`y: ${y}`, x+10, y+10)
    context.arc(
      x, y,
      this.pointRadius,
      0,
      2 * Math.PI,
      false
    )
    context.fill()
    context.closePath()

    // position for next segment
    context.beginPath()
    context.moveTo(x, y)
  })
  context.restore()
}