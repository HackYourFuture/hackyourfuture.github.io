<template>
  <div>
    <div class="video" ref="video">
    </div>
  </div>
</template>

<script>
 import youtube from '~/plugins/youtube'

 const videoConfig = {
   suggestedQuality: 'large',
   videoId: 'qFqHXZio6ZM',
   playerVars: {
     controls: 0,
     loop: 1,
     showinfo: 0,
     rel: 0
   }
 }

 export default {

   async mounted () {
     this.video = await this.addVideo()
   },

   methods: {

     play () {
       if (!!this.video) this.video.playVideo()
     },

     pause () {
       if (!!this.video) this.video.pauseVideo()
     },

     playFullScreenVideo () {
       this.video.stopVideo()
       this.video.setVolume(80)
       let iframe = this.$el.querySelector('iframe')
       let requestFullScreen = iframe.requestFullScreen ||
                               iframe.mozRequestFullScreen ||
                               iframe.webkitRequestFullScreen

       const exitHandler = () => {
         var fullScreenElement = document.fullScreen ||
                                 document.mozFullScreen ||
                                 document.webkitIsFullScreen
         if (!fullScreenElement) this.video.setVolume(0)
       }

       iframe.addEventListener('webkitfullscreenchange', exitHandler);
       iframe.addEventListener('mozfullscreenchange', exitHandler);
       iframe.addEventListener('fullscreenChange', exitHandler);
       iframe.addEventListener('MSFullscreenChange', exitHandler);

       requestFullScreen.bind(iframe)()

       this.video.playVideo()
     },

     addVideo () {
       return youtube(this.$refs.video, Object.assign({
         events: {
           onReady: e => this.onPlayerReady(e),
           onStateChange: e => this.onPlayerStateChange(e)
         }
       }, videoConfig))
     },

     onPlayerStateChange (e) {
       if (e.data === YT.PlayerState.ENDED) {
         e.target.playVideo()
       }
     },

     onPlayerReady (e) {
       e.target.setVolume(0)
       e.target.playVideo()
       setTimeout(() => e.target.pauseVideo(), 1000)
     }
   }
 }
</script>
