"use strict";

Vue.component('member-list', {
  props: ['members'],
  template: `
  <table class="table table-bordered table-hover">
      <thead>
          <tr>
              <th>Name</th>
              <th>Comment</th>
              <th>Picture</th>
          </tr>
      </thead>
      <tbody v-for="posts in processedPosts">
        <tr v-for="post in posts">
              <td>{{ post.name}}</td>
              <td>{{ post.value}}</td>
              <td><img :src="post.image_url" width="100px" height="100px"></td>
        </tr>
      </tbody>
  </table>
  `,
  computed: {
    processedPosts(){
      let posts = this.members;
      // Add image_url attribute
      // posts.map(post => {
      //   let imgObj = post.multimedia.find(media => media.subtype === "superJumbo");
      //   post.image_url = imgObj ? "https://www.nytimes.com/"+imgObj.url : "http://placehold.it/300x200?text=N/A";
      // });

      // Put Array into Chunks
      let i, j, chunkedArray = [], chunk = 4;
      for (i=0, j=0; i < posts.length; i += chunk, j++) {
        chunkedArray[j] = posts.slice(i,i+chunk);
      }
      return chunkedArray;
    }
  }
});

const vm = new Vue({
  el: '#app',
  data:{
    members: "",
    loading: true
  },
  mounted () {
    this.getMembers();
  },
  methods: {
    getMembers() {
      let url = "http://localhost:3000/members"
      //let url = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=Japan&api-key=ac7b0305bb254c419af31307f2f98ebf";
      axios.get(url).then((response) => {
          this.loading = false;
          //this.members = response.data.response.docs;
          this.members = response.data.data
          console.log(this.members)
        }).catch((error) => { console.log(error); });
    }
  }
});
