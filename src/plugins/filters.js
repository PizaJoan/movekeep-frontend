// import something here

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do

    Vue.filter('capitalize', title => {
        if (!title) return ''
        title = title.toString()
        return title.charAt(0).toUpperCase() + title.slice(1)
    })

    Vue.filter('getTypeRoutine', type => {
        switch(type) {
            case 'time':
                return 'Temps'
            case 'reps':
                return 'Repeticions'
            default:
                return ''
        } 
    })
}
