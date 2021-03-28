<template>
  <div class="app-container">
    <el-input v-model="SearchBookName" placeholder="enter bookname to search" clearable maxlength="10" show-word-limit></el-input>
    <el-button type="success" plain @click="createBookFormVisible = true">CreateBook</el-button>
    <el-table
      v-loading="listLoading"
      :data="Books"
      element-loading-text="Loading"
      border fit highlight-current-row
    >
      <el-table-column align="center" label="orderby" width="95">
        <template slot-scope="scope">
          {{ scope.row.orderby }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="book img" width="95">
        <template slot-scope="scope">
          <div style="height: 50px; width: 50px;margin-left: 15%;">
            <img :src="scope.row.img" :alt="scope.row.img" style="height: 100%; width: 100%;">
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="book name">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Details" width="250">
        <template slot-scope="scope">
          <el-button @click="checkDetails(scope.row)" type="info" size="small" plain>Details</el-button>
          <el-button size="small" type="danger" plain>
            <router-link :to="{path: '/book/chapter/' + scope.row.id}">Edit Chapter</router-link>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations" width="250">
        <template slot-scope="scope">
          <el-button @click="getUpdateBook(scope.row.id)" type="success" size="small" plain>Update Book</el-button>
          <el-button @click="deleteBook(scope.row.id)" type="danger" size="small" plain>Delete Book</el-button>
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

    <!-- createBookForm -->
    <el-dialog title="createBookForm" :visible.sync="createBookFormVisible">
      <el-form :model="createdBook">
        <el-form-item label="bookname">
          <el-input v-model="createdBook.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="orderby">
          <el-input v-model="createdBook.orderby" autocomplete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="img">
          <el-upload
            class="upload-demo"
            :action="uploadUrl()"
            :headers="headers"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-remove="beforeRemove"
            :file-list="fileList"
            list-type="picture"
            >
            <el-button size="small" type="primary">Upload</el-button>
            <div slot="tip" class="el-upload__tip">jpg/png only，size less than 500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createBookFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createBook">Confirm</el-button>
      </div>
    </el-dialog>
    <!-- updateBookForm -->
    <el-dialog title="updateBookForm" :visible.sync="updateBookFormVisible">
      <el-form :model="updatedBook">
        <el-form-item label="bookname">
          <el-input v-model="updatedBook.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="orderby">
          <el-input v-model="updatedBook.orderby" autocomplete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="img">
          <el-upload
            class="upload-demo"
            :action="uploadUrl()"
            :headers="headers"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccessforUpdate"
            :before-remove="beforeRemove"
            :file-list="fileList"
            list-type="picture"
            >
            <el-button size="small" type="primary">Upload</el-button>
            <div slot="tip" class="el-upload__tip">jpg/png only，size less than 500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateBookFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateBook(updatedBook, updatedBook.id)">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getBook, createBook as creatBook, updateBook as updatBook, deleteBook as delBook} from '@/api/book';
import {getToken} from '@/utils/auth';

export default {
  data() {
    return {
      SearchBookName: '',
      listLoading: false,
      Books: [],
      createBookFormVisible: false,
      createdBook: {
        title: '',
        img: '',
        orderby: ''
      },
      updateBookFormVisible: false,
      updatedBook: {
        id:'',
        title: '',
        img: '',
        orderby: ''
      },
      // temporary set for token
      headers: {
        token: ''
      },
      fileList: []
    }
  },
  methods: {
    createBook(){
      this.createBookFormVisible = false;
      creatBook(this.createdBook).then(res => {
        if(res.code === 20000){
          this.$message({
            type: 'success',
            message: 'createBook succeeded!'
          });
          this.fetchData();
        }else {
          this.$message({
            type: 'info',
            message: 'createBook failed!'
          });
          this.fetchData();
        }
      }).catch(e => {
        this.$message({
          type: 'info',
          message: 'createBook initially Failed!'
        });
        this.fetchData();
      })
    },
    // check details for book
    checkDetails(){

    },
    uploadUrl(){
      return process.env.VUE_APP_BASE_API + '/bookImg';
    },
    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleSuccess(response, file, fileList){
      this.createdBook.img =  response.data.file;
    },
    handleSuccessforUpdate(response, file, fileList){
      this.updatedBook.img =  response.data.file;
    },       
    beforeRemove(file, fileList) {
      return this.$confirm(`Remove ${ file.name }？`);
    },
    getUpdateBook(id){
      this.Books.forEach(book => {
        if(book.id == id){
          this.updatedBook.id = book.id;
          this.updatedBook.title = book.title;
          this.updatedBook.img = book.img;
          this.updatedBook.orderby = book.orderby;
        } else{
          return;
        }
      });
      this.updateBookFormVisible = true;
    },
    updateBook(book,id){
      updatBook(book, id).then(res => {
        if(res.code === 20000){
          this.$message({
            type: 'success',
            message: 'updateBook succeeded!'
          });
          this.fetchData();
        }else {
          this.$message({
            type: 'info',
            message: 'updateBook failed!'
          });
          this.fetchData();
        }
      }).catch(e => {
        this.$message({
          type: 'info',
          message: 'updateBook initially Failed!'
        });
        this.fetchData();
      })
      this.updateBookFormVisible = false;
    },
    deleteBook(id){
      this.$confirm('Delete this book', 'Confirmation', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          delBook(id).then(res => {
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete Canceled'
          });          
        });
    },
    fetchData() {
      this.listLoading = true
      getBook().then(response => {
        this.Books = response.data;
        this.listLoading = false;
      }).catch(e => {
        this.$message({
          type: 'warning',
          message: 'get book failed!',
        });
          this.listLoading = false;
        })
    }
  },
  created(){
    this.fetchData();
    this.headers.token = getToken();
  }
}
</script>
