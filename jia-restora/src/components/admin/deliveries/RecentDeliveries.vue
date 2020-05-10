<template>
  <v-app>
    <Navbar/>
    <div>
      <v-content>
        <v-container fluid grid-list-md>
          <v-layout>
            <v-flex>
              <v-sheet height="800">
                <!--  :now="today"  now is normally calculated by itself, but to keep the calendar in this date range to view events -->
                <v-calendar
                  ref="calendar"                           
                  :value="today"
                  color="primary"
                  type="week"
                >
                  <!-- the events at the top (all-day) -->
                  <template
                  slot="dayHeader"
                  slot-scope="{ date }"
                  >
                    <template v-for="event in eventsMap[date]">
                      <!-- all day events don't have time -->
                      <div
                      v-if="!event.time"
                      :key="event.title"
                      class="my-event"
                      @click="open(event)"
                      v-html="event.title"
                      ></div>
                    </template>
                  </template>
                  <!-- the events at the bottom (timed) -->
                  <template
                  slot="dayBody"
                  slot-scope="{ date, timeToY, minutesToPixels }"
                  >
                    <template v-for="event in eventsMap[date]">
                      <!-- timed events -->
                      <div
                      v-if="event.time"
                      :key="event.title"
                      :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                      class="my-event with-time"                                
                      v-html="'Delivery Person: ' + event.delivery_person_name +'<br>' +'Order ID:  ' + '#'+event.order_id"
                      ></div>
                    </template>
                  </template>
                </v-calendar>
              </v-sheet>
            </v-flex>
          </v-layout>
        </v-container>      
      </v-content>
    </div>
  </v-app>

</template>

<script>
import Navbar from '@/components/admin/navbar/Navbar'
import firebase from "firebase";
import moment from 'moment'
export default {
  name:'Deliveries',
  components: {
    Navbar
  },
  data(){
    return{
      date:[], 
      today: moment().format('DD-MM-YYYY'),
      events: []
    }
  },  
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap () {
      const map = {}
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
      return map
    }
  },
  mounted () {
    this.$refs.calendar.scrollToTime('00:00')
  },
  methods: {
    open (event) {
      alert(event.title + event.person)
    }
  },
  created(){
    // Show All Deliveries
    var db = firebase.firestore(); 
    let ref = db.collection('deliveries').where("delivery_status", "==", "Processing").orderBy('timestamp', 'desc');

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'added'){
          let doc = change.doc
          this.events.push({              
          order_id:doc.data().order_id,
          delivery_person_name:doc.data().delivery_person_name,
          date:doc.data().date,
          time:doc.data().time,
          duration:doc.data().duration,
          })
        }
      })
    })
  }
  
}
</script>

<style scoped>

.my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #F16D07;
    color: #ffffff;
    border: 1px solid #F16D07;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    left: 4px;
    margin-right: 8px;
    position: relative;
}
.with-time {
    position: absolute;
    right: 4px;
    margin-right: 0px;
   
}
</style>
