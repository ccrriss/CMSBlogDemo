<template>
  <div class="app-container">
    <el-input v-model="SearchUserName" placeholder="enter username to search" clearable maxlength="10" show-word-limit></el-input>
    <el-button type="success" plain @click="createUserFormVisible = true">CreateUser</el-button>
    <el-table
      v-loading="listLoading"
      :data="Users"
      element-loading-text="Loading"
      border fit highlight-current-row
    >
      <el-table-column align="center" label="user name">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="user password">
        <template slot-scope="scope">
          {{ scope.row.password }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations" width="250">
        <template slot-scope="scope">
          <el-button @click="getUpdateUser(scope.row.id)" type="success" size="small" plain>Update User</el-button>
          <el-button @click="deleteUser(scope.row.id)" type="danger" size="small" plain>Delete User</el-button>
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
    <el-dialog title="createResourceForm" :visible.sync="createUserFormVisible">
      <el-form :model="createdUser">
        <el-form-item label="username">
          <el-input v-model="createdUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="userpassword">
          <el-input v-model="createdUser.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createUserFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createUser">Confirm</el-button>
      </div>
    </el-dialog>
    <!-- updateResourceForm -->
    <el-dialog title="updateUserForm" :visible.sync="updateUserFormVisible">
      <el-form :model="updatedUser">
        <el-form-item label="username">
          <el-input v-model="updatedUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="userpassword">
          <el-input v-model="updatedUser.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateUserFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateUser(updatedUser, updatedUser.id)">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {getUser, createUser as creatUser, updateUser as updatUser, deleteUser as delUser} from '@/api/user'
import clearForm from '@/utils/clearform';

export default {
  data() {
    return {
      SearchUserName: '',
      listLoading: false,
      Users:[],
      createUserFormVisible: false,
      createdUser: {
        id:'',
        username:'',
        password: '',
      },
      updateUserFormVisible: false,
      updatedUser: {
        id:'',
        username:'',
        password: '',
      },
    }
  },
  methods: {
    fetchData(){
      this.listLoading = true;
      getUser().then(res => {
        this.Users = res.data;
        this.listLoading = false;
      }).catch(e => {
        this.$message({
          type: 'warning',
          message: 'get users failed'
        })
        this.listLoading = false;
      })
    },
    getUpdateUser(id){
      this.Users.forEach(user => {
        console.log('user', user);
        if(user.id == id){
          this.updatedUser.id = user.id;
          this.updatedUser.username = user.username;
          this.updatedUser.password = user.password;
        } else {
          return;
        }
      })
      this.updateUserFormVisible = true;
    },
    deleteUser(id){
      this.$confirm('Delete this user', 'Confirmation', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        delUser(id).then(res => {
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
    createUser(){
      creatUser({
        username: this.createdUser.username,
        password: this.createdUser.password,
      }).then(res => {
        if(res.code == 20000){
          this.$message({
            type:'success',
            message: 'create user succeeded'
          })
          this.fetchData();
        }else {
          this.$message({
            type: 'info',
            message: 'create user failed'
          })
          this.fetchData();
        }
      }).catch(e => {
        this.$message({
          type: 'info',
          message: 'create user initially failed'
        });
        this.fetchData();
      })
      clearForm(this.createdUser);
      this.createUserFormVisible = false;
    },
    updateUser(data, id){
      updatUser(data, id).then(res => {
        if(res.code == 20000){
          this.$message({
            type: 'success',
            message: 'updateUser succeeded!'
          });
          this.fetchData();
        }else {
          this.$message({
            type: 'info',
            message: 'updateUser failed!'
          });
          this.fetchData();
        }
      }).catch(e => {
        this.$message({
          type: 'info',
          message: 'updateUser initially failed!'
        });
        this.fetchData();
      })
      clearForm(this.updatedUser);
      this.updateUserFormVisible = false;
    },
    uploadImg(){
      return process.env.VUE_APP_BASE_API + "/downloadImg";
    },
  },
  created() {
    this.fetchData();
  },
}
</script>