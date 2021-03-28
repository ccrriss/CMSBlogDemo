<template>
  <div class="app-container">
    <el-input v-model="SearchBlogName" placeholder="enter blog to search" clearable maxlength="10" show-word-limit></el-input>
    
    <router-link :to="{ path: '/blog/blogEdit/' + null }">
      <el-button type="success" plain>CreateBlog</el-button>
    </router-link>
    
    <el-table
      v-loading="listLoading"
      :data="Blog"
      element-loading-text="Loading"
      border fit highlight-current-row
    >
      <el-table-column align="center" label="blog id">
        <template slot-scope="scope">
          {{ scope.$index +1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="book image">
        <template slot-scope="scope">
          <div style="height: 50px; width: 50px;margin-left: 15%;" >
            <img :src="scope.row.img" :alt="scope.row.title" style="height: 100%; width: 100%;">
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="blog name">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Details" width="250">
        <template slot-scope="scope">
          <el-button @click="checkDetails(scope.row)" type="info" size="small" plain>Details</el-button>
          <el-button size="small" type="danger" plain>
            <router-link :to="{path: '/blog/blogEdit/' + scope.row.id}">Edit Blog</router-link>
          </el-button>
        </template>
      </el-table-column>
       <el-table-column align="center" label="created time" >
        <template slot-scope="scope">
          {{ scope.row.createdAt }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="updated time">
        <template slot-scope="scope">
          {{ scope.row.updatedAt }}
        </template>
      </el-table-column>

       <el-table-column label="Operations" align="center">
        <template slot-scope="scope">
          <el-button type="danger" plain @click="deleteBlog(scope.row.id)">Delete Blog</el-button >
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        @current-change="ondata"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>

import {getBlog, getBlogDetail, createBlog as creatBlog, updateBlog as updatBlog, deleteBlog as delBlog} from '@/api/blog'

export default {
  data() {
    return {
      SearchBlogName: '',
      listLoading: false,
      Blog:[],
    }
  },
  methods: {
    fetchData(){
      this.listLoading = true;
      getBlog({page:1}).then(res => {
        this.Blog = res.data;
        this.listLoading = false;
      }).catch(e => {
        this.$message({
          type: 'warning',
          message: 'get blogs failed'
        })
        this.listLoading = false;
      })
    },
    deleteBlog(id){
      this.$confirm('Delete this blog', 'Confirmation', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
      .then(() => {
        delBlog(id).then(res => {
          if(res.code === 20000){
            this.$message({
              type: 'success',
              message: 'Delete Succeeded!'
            });
            this.fetchData();
          } else {
            this.$message({
              type: 'info',
              message: 'Delete failed!'
            });
            this.fetchData();
          }
        });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete Canceled'
        });          
      });
    },

    ondata(page){
      getBlog({page}).then(res => {
        this.Blog = res.data,
        this.listLoading = false;
      })
    }
  },
  created() {
    this.fetchData();
  },
}
</script>