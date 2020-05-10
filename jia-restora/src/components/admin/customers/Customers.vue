<template>
  <v-app>
      <Navbar/>
    <div>
      <ShowCustomers/>
    </div>
  </v-app>
</template>

<script>
import ShowCustomers from '@/components/admin/customers/ShowCustomers'
import Navbar from '@/components/admin/navbar/Navbar'

export default {
  name:'Customers',
  components:{
    Navbar,ShowCustomers
  },
  data(){
    return{

    }
  },

}
</script>

<style>
tbody tr{
  text-align: center;
}
.input-group__input placeholder{
  color: red;
}
.primary--text {
  color: #F16D07 !important;
  caret-color: #F16D07 !important;
}

</style>
