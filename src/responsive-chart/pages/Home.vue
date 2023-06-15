<script setup>
  import { ref, defineAsyncComponent } from 'vue';
  // const Chart = defineAsyncComponent(() =>
  //   import('../components/Chart.vue')
  // )
  import CanvasChart from '../components/CanvasChart.vue'
  
  // let rtlh = ref([])
  // let year_list = ref([])
  // let city_list = ref([])
  // let series = ref([])
  let series = ref([
    {
      lineWidth: 1,
      value: [5, 10, 20, 40, 60, 10] 
    },
    {
      lineWidth: 1,
      value: [0, 85, 70, 80, 40, 50] 
    },
    {
      lineWidth: 1,
      value: [90, 80, 75, 75, 45, 35] 
    }
  ])
  let xAxis = ref(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
  
  // const getData = async () => {
  //   try {
  //     let res = await fetch('assets/rumah-tak-layak-huni.json');
  //     rtlh.value = await res.json();

  //     year_list.value = rtlh.value
  //       .filter(val => val.kabupaten_kota == rtlh.value[0].kabupaten_kota)
  //         .map(val => val.periode_update)
  //     city_list.value = rtlh.value
  //       .filter(val => val.periode_update == rtlh.value[0].periode_update)
  //         .map(val => val.kabupaten_kota)
          
  //     series.value = city_list.value.map(city => {
  //       let data = []
  //       rtlh.value.forEach(val => {
  //         if(val.kabupaten_kota == city) {
  //           data.push(val.kebutuhan_rtlh)
  //         }
  //       })
        
  //       return {
  //         name: city,
  //         data
  //       }
  //     })
  //   } catch (error) {
  //     error = ref(error)
  //     console.log(error);
  //   }
  // }

  // getData()
</script>

<template>
  <RouterLink 
    to="/subpage"
    class="text-teal-400"
  >Go to subpage</RouterLink>
  
  <!-- <Chart :series="series" :xaxis="year_list" /> -->
  <CanvasChart :series="series" :xaxis="xAxis" />
</template>