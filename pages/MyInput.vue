<template>
  <div>
    <v-btn @click="addTask">
      add
    </v-btn>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from 'firebase/firestore'

export default {
  data () {
    return {
      id: '001',
      name: 'test'
    }
  },
  methods: {
    addTask () {
      const db = getFirestore()
      addDoc(collection(db, 'tasks'), {
        id: this.id,
        name: this.name
      })
      console.log('Document written with ID: ', this.id)
    }
  }
}
</script>
