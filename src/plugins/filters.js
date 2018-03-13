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

    Vue.filter('getUserPic', path => {
        return path.includes('http://') ? path : `${process.env.API}${path}`
    })

    Vue.filter('typeRoutine', type => {
        switch(type) {
            case 'time':
                return app.i18n.t('fields.exercise.infoTime')
            case 'reps':
                return app.i18n.t('fields.exercise.infoReps')
            default:
                return ''
        }  
    })
}
