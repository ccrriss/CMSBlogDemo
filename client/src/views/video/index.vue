<template>
  <div class="app-container">
    <el-input v-model="SearchVideoName" placeholder="enter videoname to search" clearable maxlength="10" show-word-limit></el-input>
    <el-button type="success" plain @click="createVideoFormVisible = true">CreateVideo</el-button>
    <el-table
      v-loading="listLoading"
      :data="Videos"
      element-loading-text="Loading"
      border fit highlight-current-row
    >
      <el-table-column align="center" label="video name">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="video url">
        <template slot-scope="scope">
          {{ scope.row.iframe_url }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations" width="250">
        <template slot-scope="scope">
          <el-button @click="getUpdateVideo(scope.row.id)" type="success" size="small" plain>Update Video</el-button>
          <el-button @click="deleteVideo(scope.row.id)" type="danger" size="small" plain>Delete Video</el-button>
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
    </el-table>
    
    <!-- createVideoForm -->
    <el-dialog title="createVideoForm" :visible.sync="createVideoFormVisible">
      <el-form :model="createdVideo">
        <el-form-item label="videoname">
          <el-input v-model="createdVideo.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="video iframe_url">
          <el-input v-model="createdVideo.iframe_url" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createVideoFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createVideo">Confirm</el-button>
      </div>
    </el-dialog>
    <!-- updateVideoForm -->
    <el-dialog title="updateVideoForm" :visible.sync="updateVideoFormVisible">
      <el-form :model="updatedVideo">
        <el-form-item label="videoname">
          <el-input v-model="updatedVideo.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="video iframe_url">
          <el-input v-model="updatedVideo.iframe_url" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateVideoFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateVideo(updatedVideo, updatedVideo.id)">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {getVideo, createVideo as creatVideo, updateVideo as updatVideo, deleteVideo as delVideo} from '@/api/video'

export default {
  data() {
    return {
      SearchVideoName: '',
      listLoading: false,
      Videos:[],
      createVideoFormVisible: false,
      createdVideo: {
        id:'',
        title:'',
        iframe_url:''
      },
      updateVideoFormVisible: false,
      updatedVideo: {
        id:'',
        title:'',
        iframe_url:''
      },
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData(){
      this.listLoading = true;
      getVideo({page: 1}).then(res => {
        this.Videos = res.data;
        this.listLoading = false;
      }).catch(e => {
        this.$message({
          type: 'warning',
          message: 'get videos failed'
        })
        this.listLoading = false;
      })
    },
    getUpdateVideo(id){
      this.Videos.forEach(video => {
        if(video.id == id){
          this.updatedVideo.id = video.id;
          this.updatedVideo.title = video.title;
          this.updatedVideo.iframe_url = video.iframe_url;
        } else {
          return;
        }
      })
      this.updateVideoFormVisible = true;
    },
    deleteVideo(id){
      this.$confirm('Delete this video', 'Confirmation', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        delVideo(id).then(res => {
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
      }).catch( e => {
        this.$message({
          type: 'info',
          message: 'Delete Canceled'
        });          
      });
    },
    createVideo(){
      creatVideo({
        title: this.createdVideo.title,
        iframe_url: this.createdVideo.iframe_url,
      }).then(res => {
        if(res.code == 20000){
          this.$message({
            type:'success',
            message: 'create video succeeded'
          })
        }else {
          this.$message({
            type: 'info',
            message: 'create video failed'
          })
        }
        this.fetchData();
        this.createVideoFormVisible = false;
      }).catch(e => {
        this.$message({
          type: 'info',
          message: 'create video initially failed'
        });
        this.fetchData();
        this.createVideoFormVisible = false;
      })
      
    },
    updateVideo(data, id){
      updatVideo(data, id).then(res => {
        if(res.code == 20000){
          this.$message({
            type: 'success',
            message: 'updatevideo succeeded!'
          });
        }else {
          this.$message({
            type: 'info',
            message: 'updatevideo failed!'
          });
        }
        this.fetchData();
        this.updateVideoFormVisible = false;
      }).catch(e => {
        this.$message({
          type: 'info',
          message: 'updatevideo initially failed!'
        });
        this.fetchData();
        this.updateVideoFormVisible = false;
      })
      
    },
  },
}
</script>