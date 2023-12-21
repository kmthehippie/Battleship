

export const pubsub = {

    events: {},
    subscribe: function(evName, fn){
        console.log(`PUBSUB: Someone just sub to know about ${evName}`)
        this.events[evName] = this.events[evName] || [];
        this.events[evName].push(fn);
    },
    unsubscribe: function(evName, fn){
        console.log(`PUBSUB: Someone just unsub from ${evName}`)
        if(this.events[evName]){
            this.events[evName] = this.events[evName].filter(f=>f !== fn)
        }
    },
    publish: function(evName, data){
        console.log(`PUBSUB: Broadcasting about ${evName} with ${data}`)
        if(this.events[evName]) {
            this.events[evName].forEach(f=>{
                f(data)
            })
        }
    }
}