<template>
<v-container>
<v-row class="text-left">
        <v-col cols="12">
            <div class="headerSearch ">
                <div class="pull-left">
                    <div class="input-group" style="margin-right: 5px;">
                        <label id="user-title" class="input-group"><h2 style="margin: 10px 0px 20px 0px;">User Management</h2></label>
                    </div>
                </div>
            </div>
        </v-col>
        </v-row>
        
    <v-layout wrap>
      <v-flex xs4
        v-for="(item, index) in wholeResponse"
        :key="index"
        mb-2>
        <v-card>
<v-card-title primary-title>
            <div>
              <h4>{{item.Title}}</h4>
              <div>Year: {{item.Year}}</div>
              <div>IMDB-id: {{item.imdbID}}</div>
            </div>
          </v-card-title>
<v-card-actions>
          </v-card-actions>
</v-card>
      </v-flex>
  </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      wholeResponse: []
    }
  },
  mounted () {
  axios
    .get('http://www.omdbapi.com/?s=indiana&apikey=b76b385c&page=1&type=movie&Content-Type=application/json')
    .then(response => {
      this.wholeResponse = response.data.Search
      console.log("aaa")
    })
    .catch(error => {
      console.log(error)
    })
  }
}
</script>
<style scoped>

</style>