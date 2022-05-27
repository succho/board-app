<template>
  <div>
    <h1>掲示板</h1>
    <div>
      <div>
        <label>
          名前
        </label>
      </div>
      <input v-model="name">
      <div>
        <label>
          コメント
        </label>
      </div>
      <input v-model="comment">
    </div>
    <v-btn id="post-btn" @click="post(); removetext()">
      投稿する
    </v-btn>
    <ul v-for="(data, index) in allData" :key="data.id" class="menu-list">
      <li>
        {{ count - index }}：
        名前：{{ data.name }} <br>
        コメント：{{ data.comment }}<br>
        <v-btn size="sm" variant="outline-danger" class="delete" @click="switchDeleteAlarm(data.id)">
          削除
        </v-btn>
      </li>
    </ul>
    <div v-show="showDeleteAlarm" id="overlay">
      <div id="deleteAlarm">
        <p>コメントを削除します</p>
        <v-btn size="sm" variant="outline-dark" @click="closeModal">
          戻る
        </v-btn>
        <v-btn size="sm" variant="outline-danger" @click="deleteItem()">
          削除
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc, getDocs, orderBy, query, doc, deleteDoc } from 'firebase/firestore'
import { app } from '../plugins/firebase'

export default {
  components: {},

  data () {
    return {
      db: {},
      allData: [],
      name: '',
      comment: '',
      showDeleteAlarm: false,
      id: [],
      count: 0
    }
  },
  mounted () {
    window.onload = this.get(getFirestore(app))
  },
  methods: {
    post () {
      const db = getFirestore(app)
      addDoc(collection(db, 'boards'), {
        name: this.name,
        comment: this.comment,
        created: new Date()
      })
      console.log('Document written with ID: ', this.id)
      this.get(db)
    },
    get (db) {
      this.allData = []
      getDocs(query(collection(db, 'boards'), orderBy('created', 'desc'))).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.allData.push({
            name: doc.data().name,
            comment: doc.data().comment,
            created: doc.data().created,
            id: doc.id
          })
        })
        console.log(this.allData)
        this.count = this.allData.length
      })
    },
    async deleteItem () {
      const db = getFirestore(app)
      await deleteDoc(doc(db, 'boards', this.id)).then(function () {
        console.log('Document successfully deleted!')
      }).catch(function (error) {
        console.error('Error removing document: ', error)
      })
      this.showDeleteAlarm = false
      this.get(db)
    },
    switchDeleteAlarm (deleteId) {
      this.showDeleteAlarm = true
      this.id = deleteId
    },
    closeModal () {
      this.showDeleteAlarm = false
    },
    removetext () {
      this.name = ''
      this.comment = ''
    }
  }
}
</script>

<style>
#deleteAlarm {
  z-index:2;
  width:50%;
  padding: 1em;
  background:#fff;
}

#overlay {
  /*要素を重ねた時の順番*/
  z-index:1;

  /*画面全体を覆う設定*/
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  /*画面の中央に要素を表示させる設定*/
  display: flex;
  align-items: center;
  justify-content: center;
}
ul {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding: 0px;
  list-style: none;
}
#button {
  margin-top: 2px;
}
input {
  border: 2px solid #0a0;
}
#post-btn {
  margin-top: 1.5em;
  margin-bottom: 2em;
}
</style>
