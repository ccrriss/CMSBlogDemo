<template>
  <div class="app-container">
    <!-- <h1>Blog title: {{sectionTitle}}</h1>
    
    <div>
      <span>Upload Title:</span>
      <el-input v-model="sectionTitle" placeholder="title of section"></el-input>
    </div> -->
    <div>
       <mavon-editor ref='md' @imgAdd="$imgAdd" @imgDel="$imgDel" @change="changeData" 
        v-model="content.md_text" language="en">
       </mavon-editor>
       <el-button type="success" @click="preservation">Save</el-button>
    </div>
  </div>
</template>

<script>
import {getContent, createContent as creatContent, updateContent as updatContent, deleteContent as delContent} from '@/api/sectionEdit';
import request from '@/utils/request'

export default {
  data(){
    return {
      sectionId: '',
      content:{
        id:'',
        md_text:'',
        html_text:'',
        sectionId:''
      },
    }
  },
  created(){
    this.getSectionId();
    this.fetchData();
  },
  methods: {
    getSectionId(){
      this.sectionId = this.$route.params.id;
    },
    fetchData(){
      getContent({
        section_id: this.sectionId
      }).then(res =>{
        if(res.code == 20000 && res.data !== null){
          this.content = res.data;
        }else {
          return;
        }
      }).catch(e => {
        this.$message({
          type: 'info',
          message: 'get content of section failed'
        })
      });
    },
    preservation(){
      if(!this.content.id){
        creatContent({
          md_text:this.content.md_text,
          html_text:this.content.html_text,
          section_id: this.sectionId
        }).then(res => {
          if(res.code == 20000){
            this.$message({
              type: 'success',
              message: 'add content of section succeeded!'
            });
            window.history.back();
          } else{
            this.$message({
              type: 'info',
              message: 'add content of section failed!'
            })
          }
        })
      }else if(this.content.id){
        updatContent({
          md_text:this.content.md_text,
          html_text:this.content.html_text,
          section_id: this.content.sectionId
        }, this.content.id).then(res => {
          if(res.code == 20000){
            this.$message({
              type:'success',
              message:'update content succeeded'
            });
            window.history.back();
          } else {
            this.$message({
              type:'info',
              message: 'update content failed!'
            })
          }
        })
      } else {
        this.$message({
          type: 'error',
          message: 'something wrong with content'
        })
      }
    },
    // render is html result after Markdown parsing, from official documentation
    changeData(value, render){
      this.content.html_text = render;
    },
    $imgAdd(pos, $file){
        // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('image', $file);
      request({
          url: '/SectionContentImg',
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
        // 开发环境使用使用开发环境取消注释
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
        }
      }); */
      console.log(pos, $file);
    }

    
  },
  
}
</script>