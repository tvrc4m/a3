import Vue from 'vue'

Vue.filter('formatDate',(timestamp)=>{
    var date = new Date(timestamp * 1000);
    var year=date.getFullYear()
    var month=date.getMonth()+1;
    var day=date.getDate();
    var hour=date.getHours();
    var minute=date.getMinutes();
    return year+"-"+(month>9?month:"0"+month)+"-"+(day>9?day:"0"+day)+" "+(hour>9?hour:"0"+hour)+":"+(minute>9?minute:"0"+minute);
})