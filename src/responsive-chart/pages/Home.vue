<script setup>
  import { ref, defineAsyncComponent } from 'vue';
  const Chart = defineAsyncComponent(() =>
    import('../components/Chart.vue')
  )
  
  let rtlh = ref([])
  let year_list = ref([])
  let city_list = ref([])
  let series = ref([])
  
  const getData = async () => {
    try {
      let res = await fetch('assets/rumah-tak-layak-huni.json');
      rtlh.value = await res.json();

      year_list.value = rtlh.value
        .filter(val => val.kabupaten_kota == rtlh.value[0].kabupaten_kota)
          .map(val => val.periode_update)
      city_list.value = rtlh.value
        .filter(val => val.periode_update == rtlh.value[0].periode_update)
          .map(val => val.kabupaten_kota)
          
      series.value = city_list.value.map(city => {
        let data = []
        rtlh.value.forEach(val => {
          if(val.kabupaten_kota == city) {
            data.push(val.kebutuhan_rtlh)
          }
        })
        
        return {
          name: city,
          data
        }
      })
    } catch (error) {
      error = ref(error)
      console.log(error);
    }
  }

  getData()
</script>

<template>
  <RouterLink 
    to="/subpage"
    class="text-teal-400"
  >Go to subpage</RouterLink>
  
  <Chart :series="series" :xaxis="year_list" />
</template>