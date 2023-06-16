<script setup>
  import {ref, onMounted} from 'vue'
  import Chart from '../assets/LineChart.js'

  let props = defineProps(['xaxis', 'yaxis', 'series', 'config'])
  let canvas = ref(null)
  let colors = [
    '#179D35', // green
    '#113392', // blue
    '#68DAFF', // sea blue
    '#FF6A28', // orange
    '#FBA82B', // yellow
    '#9B51E0', // purple
  ]

  let pausedAnimation = ref(false)

  function chart() {
    chart.animationToggle()
    pausedAnimation.value = !pausedAnimation.value
  }

  onMounted(() => {
    let series = props.series.map(val => {
      let random_num = Math.ceil(Math.random() * colors.length) - 1

      return {
        color: colors[random_num],
        ...val,
      }
    })
    let config = {
      maxX: 10,
      maxY: 150,
      gapX: 1,
      gapY: 10,
      padding: 20,
      ...props.config
    }
    console.log(config);
    chart = new Chart({
      target: canvas.value,
      xAxis: props.xaxis,
      data: series,
      ...config
    })
  })
</script>

<template>
  <div class="mt-8 canvas-wrapper">
    <canvas id="canvas" ref="canvas" width="1000" height="500" style="border: 1px solid black;"></canvas>
  </div>
  <button 
    @click="chart()"
    class="bg-teal-400 text-white shadow-sm hover:shadow-md shadow-teal-300 hover:shadow-teal-300 transition duration-500"
  >{{ pausedAnimation ? 'Continue' : 'Pause' }} Animation</button>
</template>