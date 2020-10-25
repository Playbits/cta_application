<template>
  <div class="container">
    <b-row>
      <b-col lg="12" class="mt-3">
        <nuxt-link to="/">Home</nuxt-link>
        <hr />
      </b-col>

      <b-col lg="12" v-if="train_arrivals">
        <h2 class="text-center">
          Showing all train Stops and arrival for {{ train_arrivals[0].staNm }}
        </h2>
        <table class="table table-bordered table-striped table-hover">
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
              <td>{{ format_date(arrival.arrT) }}</td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="12" v-else>
        <b-alert variant="danger" show> No train found for this route </b-alert>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import moment from 'moment'
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
  methods: {
    format_date(date) {
      const formatted = moment(date).format('llll')
      const fromNow = moment(date).fromNow()
      return formatted + ' | | ' + fromNow
    },
  },
}
</script>
