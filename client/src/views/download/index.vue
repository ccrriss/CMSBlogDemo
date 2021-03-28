<template>
  <div class="app-container">
    <el-input v-model="SearchResourceName" placeholder="enter resourcename to search" clearable maxlength="10" show-word-limit></el-input>
    <el-button type="success" plain @click="createResourceFormVisible = true">CreateResource</el-button>
    <el-table
      v-loading="listLoading"
      :data="Resource"
      element-loading-text="Loading"
      border fit highlight-current-row
    >
      <el-table-column align="center" label="resource name">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="resource img">
        <template slot-scope="scope">
          <div style="height: 50px;width: 50px;margin-left: 15%">
            <img :src="scope.row.img" :alt="scope.row.img" style="height: 100%;width: 100%">
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="resource code">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="resource url">
        <template slot-scope="scope">
          {{ scope.row.url }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations" width="250">
        <template slot-scope="scope">
          <el-button @click="getUpdateResource(scope.row.id)" type="success" size="small" plain>Update Resource</el-button>
          <el-button @click="deleteResource(scope.row.id)" type="danger" size="small" plain>Delete Resource</el-button>
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

    <!-- createResourceForm -->
    <el-dialog title="createResourceForm" :visible.sync="createResourceFormVisible">
      <el-form :model="createdResource">
        <el-form-item label="resourcename">
          <el-input v-model="createdResource.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="resourcecode">
          <el-input v-model="createdResource.code" autocomplete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="resourceurl">
          <el-input v-model="createdResource.url" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="resourceimg">
          <el-upload
            class="upload-demo"
            :action="uploadImg()"
            :headers="headers"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            list-type="picture"
            >
            <i class="el-icon-plus"></i>
            <el-button size="small" type="primary">Upload</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createResourceFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createResource">Confirm</el-button>
      </div>
    </el-dialog>
    <!-- updateResourceForm -->
    <el-dialog title="updateResourceForm" :visible.sync="updateResourceFormVisible">
      <el-form :model="updatedResource">
        <el-form-item label="resourcename">
          <el-input v-model="updatedResource.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="resourcecode">
          <el-input v-model="updatedResource.code" autocomplete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="resourceurl">
          <el-input v-model="updatedResource.url" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="resourceimg">
          <el-upload
            class="upload-demo"
            :action="uploadImg()"
            :headers="headers"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccessforUpdate"
            :file-list="fileList"
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
            <el-button size="small" type="primary">Upload</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateResourceFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateResource(updatedResource, updatedResource.id)">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {getResource, createResource as creatResource, updateResource as updatResource, deleteResource as delResource} from '@/api/resource'
import {getToken} from '@/utils/auth';
import clearForm from '@/utils/clearform';

export default {
  data() {
    return {
      SearchResourceName: '',
      listLoading: false,
      Resource:[],
      createResourceFormVisible: false,
      createdResource: {
        id:'',
        title:'',
        img: '',
        code: '',
        url:'',
      },
      updateResourceFormVisible: false,
      updatedResource: {
        id:'',
        title:'',
        img: '',
        code: '',
        url:'',
      },
      headers:{
        token:''
      },
      fileList:[]
    }
  },
  methods: {
    fetchData(){
      this.listLoading = true;
      getResource().then(res => {
        this.Resource = res.data;
        this.listLoading = false;
      }).catch(e => {
        this.$message({
          type: 'warning',
          message: 'get resource failed'
        })
        this.listLoading = false;
      })
    },
    getUpdateResource(id){
      this.Resource.forEach(resource => {
        if(resource.id == id){
          this.updatedResource.id = resource.id;
          this.updatedResource.title = resource.title;
          this.updatedResource.img = resource.img;
          this.updatedResource.code = resource.code;
          this.updatedResource.url = resource.url;
        } else {
          return;
        }
      })
      this.updateResourceFormVisible = true;
    },
    deleteResource(id){
      this.$confirm('Delete this resource', 'Confirmation', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        delResource(id).then(res => {
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
    createResource(){
      creatResource({
        title: this.createdResource.title,
        code: this.createdResource.code,
        url: this.createdResource.url,
        img: this.createdResource.img
      }).then(res => {
        if(res.code == 20000){
          this.$message({
            type:'success',
            message: 'create resource succeeded'
          })
          this.fetchData();
        }else {
          this.$message({
            type: 'info',
            message: 'create resource failed'
          })
          this.fetchData();
        }
      }).catch(e => {
        this.$message({
          type: 'info',
          message: 'create resource initially failed'
        });
        this.fetchData();
      })
      clearForm(this.createdResource);
      this.createResourceFormVisible = false;
    },
    updateResource(data, id){
      updatResource(data, id).then(res => {
        if(res.code == 20000){
          this.$message({
            type: 'success',
            message: 'updateResource succeeded!'
          });
          this.fetchData();
        }else {
          this.$message({
            type: 'info',
            message: 'updateResource failed!'
          });
          this.fetchData();
        }
      }).catch(e => {
        this.$message({
          type: 'info',
          message: 'updateResource initially failed!'
        });
        this.fetchData();
      })
      clearForm(this.updatedResource);
      this.updateResourceFormVisible = false;
    },
    uploadImg(){
      return process.env.VUE_APP_BASE_API + "/downloadImg";
    },
    handlePreview(file){
      console.log(file);
    },
    handleRemove(file, fileList){
      console.log(file, fileList);
    },
    handleSuccess(response, file, fileList){
      this.createdResource.img =  response.data.file;
    },
    handleSuccessforUpdate(response, file, fileList){
      this.updatedResource.img =  response.data.file;
    }
  },
  created() {
    this.headers.token = getToken();
    this.fetchData();
  },
}
</script>