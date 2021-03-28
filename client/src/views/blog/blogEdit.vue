<template>
  <div class="app-container">
    <h1>Blog title: {{blog.title}}</h1>
    <div>
      <span>Upload Image:</span>
      <el-upload
        :action="uploadUrl()"
        :headers="headers"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :file-list="fileList"
        list-type="picture-card"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <div>
      <span>Upload Title:</span>
      <el-input v-model="blog.title" placeholder="title of blog"></el-input>
    </div>
    <div>
       <mavon-editor ref='md' @imgAdd="$imgAdd" @imgDel="$imgDel" @change="changeData" 
        v-model="blog.md_text" language="en">
       </mavon-editor>
       <el-button type="success" @click="preservation">Save</el-button>
    </div>
  </div>
</template>

<script>
import {getBlog, getBlogDetail, createBlog as creatBlog, updateBlog as updatBlog, deleteBlog as delBlog} from '@/api/blog';
import {getToken} from '@/utils/auth';
import request from '@/utils/request'

export default {
  data(){
    return {
      id: '',
      blog:{
        id:'',
        title:'',
        md_text:'',
        html_text:'',
        img:''
      },
      headers: {
        token: ''
      },
      fileList: []
    }
  },
  methods: {
    getBlogId(){
      this.id = this.$route.params.id;
      this.fetchData();
    },
    fetchData(){
      if(this.id !== 'null'){
        getBlogDetail(this.id).then(res => {
          this.blog = res.data;
        })
      }else {
        this.blog ={
          id:'',
          title:'',
          md_text:'',
          html_text:'',
          img:''
        }
      }
    },
    //
    uploadUrl(){
      return process.env.VUE_APP_BASE_API + "/blogImg";
    },
    
    handlePictureCardPreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleSuccess(response, file, fileList){
      this.blog.img = response.data.file;
    },

    // dont worry for id, back end doesnt need id in blog, so it is just for checking
    preservation(){
      if(this.id == 'null'){
        creatBlog({
          title:this.blog.title,
          img:this.blog.img,
          md_text:this.blog.md_text,
          html_text:this.blog.html_text,
        }).then(res => {
          if(res.code == 20000){
            this.$message({
              type: 'success',
              message: 'add blog succeeded!'
            });
            window.history.back();
          } else{
            this.$message({
              type: 'info',
              message: 'add blog failed!'
            })
          }
        })
      } else if(this.id){
        updatBlog({
          title:this.blog.title,
          img:this.blog.img,
          md_text:this.blog.md_text,
          html_text:this.blog.html_text,
        }, this.id).then(res => {
          if(res.code == 20000){
            this.$message({
              type:'success',
              message:'update blog succeeded'
            });
            window.history.back();
          } else {
            this.$message({
              type:'info',
              message: 'update blog failed!'
            })
          }
        })
      } else {
        this.$message({
          type: 'error',
          message: 'something wrong with blog'
        })
      }
    },
    // render is html result after Markdown parsing, from official documentation
    changeData(value, render){
      this.blog.html_text = render;
    },
    $imgAdd(pos, $file){
        // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('image', $file);
      request({
          url: '/blogImg',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' },
      }).then((res) => {
        /**
         * 例如：返回数据为 res = [[pos, url], [pos, url]...]
         * pos 为原图片标志（0）
         * url 为上传后图片的url地址
         */
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)

        // 说明
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        let url =  res.data.file;
        this.$refs.md.$img2Url(pos, url);
      })
      .catch(e => console.log(e))
    },
    $imgDel(pos, $file) {
      /* let delURL = pos[0];
      request({
        url: "/",
        method: "delete",
        data: {
          url: delURL
      }); */
      console.log(pos, $file);
    }

    
  },
  created(){
    this.getBlogId();
    this.headers.token = getToken();
  }
}
</script>