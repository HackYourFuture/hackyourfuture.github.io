<template>
  <div>
  </div>
</template>

<script>
 import axios from '~/plugins/axios'
 import Colors from '~/constants/colors'

 export default {
     async asyncData () {
         let data
         let what
         let apply
         try {
             let req  = await axios.get('/content/en/index-about.json')
             let wReq  = await axios.get('/content/en/what.json')
             let aReq  = await axios.get('/content/en/apply.json')

             what = wReq.data.body
             apply = aReq.data.body
             data = req.data.body
         } catch (e) {
             console.log(e)
             data = false
         }
         return {
             siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
             about: data ? data : null,
             what,
             apply,
             Colors
         }
     }
 }
</script>
