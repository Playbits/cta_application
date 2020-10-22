<template>
  <div class="container">
    <nuxt-link to="/">Home</nuxt-link>
    <h2 class="text-center">
      Showing all train Stops and arrival for {{ train_arrivals[0].staNm }}
    </h2>
    <table>
      <thead>
        <th>SN</th>
        <th>Destination</th>
        <th>Stop Description</th>
        <th>Arrival time</th>
      </thead>
      <tbody>
        <tr v-for="(arrival, i) in train_arrivals" :key="arrival.stpId">
          <td>{{ i + 1 }}</td>
          <td>{{ arrival.destNm }}</td>
          <td>{{ arrival.stpDe }}</td>
          <td>{{ arrival.arrT }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios, params, query, req, res }) {
    const data = {
      key: process.env.api_key,
      mapid: params.map_id,
    }
    const response = await $axios.$get(
      '/api/1.0/ttarrivals.aspx?key=' +
        data.key +
        '&mapid=' +
        data.mapid +
        '&outputType=json'
    )
    return { train_arrivals: response.ctatt.eta }
  },
}
</script>
