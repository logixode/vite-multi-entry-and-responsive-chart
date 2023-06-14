<script setup>
  import { defineProps, ref } from 'vue';
  import { Chart } from 'highcharts-vue'

  let props = defineProps(['xaxis', 'yaxis', 'series'])
  let colors = [
    '#179D35', // green
    '#113392', // blue
    '#68DAFF', // sea blue
    '#FF6A28', // orange
    '#FBA82B', // yellow
    '#9B51E0', // purple
  ]
  let series = props.series.map(val => {
    let random_num = Math.ceil(Math.random() * colors.length) - 1

    return {
      ...val,
      color: { // line color
        linearGradient: {
          x1: 1,
          y1: 1,
          x2: 0,
          y2: 0
        },
        stops: [
          [0, colors[random_num]], // start
          [1, colors[random_num]], // end
        ]
      },
      fillColor: { // background color of areaspline type
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [0, colors[random_num] + '5A'], // start
          [1, '#ffffff55'], // end
        ]
      }
    }
  })
  let chartOptions = ref({
    chart: {
        type: 'areaspline'
    },
    title: {
        text: 'Data Rumah Tak Layak Huni (RTLH) Jawa Timur'
    },
    xAxis: {
        categories: props.xaxis
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical'
    },
    series,
    responsive: {
      rules: [{
        condition: {
          maxWidth: 700
        },
        chartOptions: {
          // set max height of chart to 700px when max width
          // of the screen is 700px
          chart: {
            height: '700px'
          },
          // move legend to bottom center when max width of 
          // the screen is 700px 
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
          },
          yAxis: {
            title: {
              text: null
            }
          },
        }
      }]
    }
  })
</script>
<template>
  <div class="mt-8">
    <div 
      class="card !p-5 transition shadow-teal-400 hover:shadow-md shadow hover:shadow-teal-400"
    >
      <Chart :options="chartOptions"  class="min-h-[600px] md:min-h-[unset]" />
    </div>
  </div>
</template>