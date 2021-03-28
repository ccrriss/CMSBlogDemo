<template>
  <div class="app-container">
    <el-input v-model="SearchChapterName" placeholder="enter chaptername to search" clearable maxlength="10" show-word-limit></el-input>
    <el-button type="success" plain @click="createChapterFormVisible = true">CreateChapter</el-button>
    <el-table
      v-loading="listLoading"
      :data="Chapters"
      element-loading-text="Loading"
      border fit highlight-current-row
    >
      <el-table-column align="center" label="orderby" width="95">
        <template slot-scope="scope">
          {{ scope.row.orderby }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="book name">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="book_id(foreign key)">
          {{ bookId }}
      </el-table-column>
      <el-table-column align="center" label="Details" width="250">
        <template slot-scope="scope">
          <el-button @click="checkDetails(scope.row)" type="info" size="small" plain>Details</el-button>
          <el-button size="small" type="danger" plain>
            <router-link :to="{path: '/book/section/' + scope.row.id}">Edit Section</router-link>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations" width="250">
        <template slot-scope="scope">
          <el-button @click="getUpdateChapter(scope.row.id)" type="success" size="small" plain>Update Chapter</el-button>
          <el-button @click="deleteChapter(scope.row.id)" type="danger" size="small" plain>Delete Chapter</el-button>
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

    <!-- createChapterForm -->
    <el-dialog title="createChapterForm" :visible.sync="createChapterFormVisible">
      <el-form :model="createdChapter">
        <el-form-item label="chaptername">
          <el-input v-model="createdChapter.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="orderby">
          <el-input v-model="createdChapter.orderby" autocomplete="off" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createChapterFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createChapter">Confirm</el-button>
      </div>
    </el-dialog>
    <!-- updateChapterForm -->
    <el-dialog title="updateChapterForm" :visible.sync="updateChapterFormVisible">
      <el-form :model="updatedChapter">
        <el-form-item label="chaptername">
          <el-input v-model="updatedChapter.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="orderby">
          <el-input v-model="updatedChapter.orderby" autocomplete="off" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateBookFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateChapter(updatedChapter, bookId)">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {getChapter, createChapter as creatChapter, updateChapter as updatChapter, deleteChapter as delChapter} from '@/api/chapter'

export default {
  data() {
    return {
      SearchChapterName: '',
      listLoading: false,
      Chapters:[],
      createChapterFormVisible: false,
      createdChapter: {
        title:'',
        order_by: '',
      },
      updateChapterFormVisible: false,
      updatedChapter: {
        title:'',
        order_by: '',
      },
      bookId: ''
    }
  },
  methods: {
    getBookId(){
      this.bookId = this.$route.params.id;
    },
    fetchData(){
      this.listLoading = true;
      getChapter(this.bookId).then(res => {
        console.log(res.data);
        this.Chapters = res.data;
        this.listLoading = false;
      }).catch(e => {
        this.$message({
          type: 'warning',
          message: 'get chapter failed'
        })
        this.listLoading = false;
      })
    },
    getUpdateChapter(id){
      this.Chapters.forEach(chapter => {
        if(chapter.id == id){
          this.updatedChapter.title = chapter.title,
          this.updatedChapter.orderby = chapter.orderby
        } else{
          return;
        }
      })
      this.updateChapterFormVisible = true;
    },
    deleteChapter(id){
      this.$confirm('Delete this chapter', 'Confirmation', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        delChapter(id).then(res => {
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
    createChapter(){
      creatChapter({
        title: this.createdChapter.title,
        orderby: this.createdChapter.orderby,
        book_id: this.bookId
      }).then(res => {
        if(res.code == 20000){
          this.$message({
            type: 'success',
            message: 'add chapter succeeded!'
          });
          this.fetchData();
        } else{
          this.$message({
            type: 'info',
            message: 'add chapter failed!'
          })
          this.fetchData();
        }
      }).catch(e => {
        console.log(e);
        this.$message({
          type: 'info',
          message: 'add chapter initially failed!'
        })
        this.fetchData();
      })
      this.createChapterFormVisible = false;
    },
    updateChapter(data, id){
      updatChapter({
        title: data.title,
        order_by: data.orderby,
        book_id: this.bookId
      }, id).then(res => {
        if(res.code == 20000){
          this.$message({
            type: 'success',
            message: 'update chapter succeeded!'
          });
          this.fetchData();
        } else{
          this.$message({
            type: 'info',
            message: 'update chapter failed!'
          })
          this.fetchData();
        }
      }).catch(e => {
        console.log(e);
        this.$message({
          type: 'info',
          message: 'something wrong with chapter'
        })
        this.fetchData();
      })
      this.updateChapterFormVisible = false;
    }
  },
  created() {
    this.getBookId();
    this.fetchData();
  },
}
</script>