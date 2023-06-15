<script setup>
  import {ref, onMounted} from 'vue'
  import Chart from '../assets/LineChart.js'

  let props = defineProps(['xaxis', 'yaxis', 'series'])
  let canvas = ref(null)
  let colors = [
    '#179D35', // green
    '#113392', // blue
    '#68DAFF', // sea blue
    '#FF6A28', // orange
    '#FBA82B', // yellow
    '#9B51E0', // purple
  ]

  onMounted(() => {
  let series = props.series.map(val => {
    let random_num = Math.ceil(Math.random() * colors.length) - 1

    console.log(colors[random_num]);
    return {
      color: colors[random_num],
      ...val,
    }
  })
    console.log(props.series);
    new Chart({
      target: canvas.value,
      xAxis: props.xaxis,
      data: series,
      maxX: 10,
      maxY: 150,
      gapX: 1,
      gapY: 10,
      padding: 20
    })
  })
</script>

<template>
  <div class="mt-8 canvas-wrapper">
    <canvas id="canvas" ref="canvas" width="1000" height="500" style="border: 1px solid black;"></canvas>
  </div>
</template>