<template>
  <div class="app-container">
    <el-input v-model="SearchSectionName" placeholder="enter sectionname to search" clearable maxlength="10" show-word-limit></el-input>
    <el-button type="success" plain @click="createSectionFormVisible = true">CreateSection</el-button>
    <el-table
      v-loading="listLoading"
      :data="Sections"
      element-loading-text="Loading"
      border fit highlight-current-row
    >
      <el-table-column align="center" label="orderby" width="95">
        <template slot-scope="scope">
          {{ scope.row.orderby }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="section name">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="chapter_id(foreign key)">
          {{ chapterId }}
      </el-table-column>
      <el-table-column align="center" label="Details" width="250">
        <template slot-scope="scope">
          <el-button @click="checkDetails(scope.row)" type="info" size="small" plain>Details</el-button>
          <el-button size="small" type="danger" plain>
            <router-link :to="{path: '/book/sectionEdit/' + scope.row.id}">Edit Content</router-link>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations" width="250">
        <template slot-scope="scope">
          <el-button @click="getUpdateSection(scope.row.id)" type="success" size="small" plain>Update Section</el-button>
          <el-button @click="deleteSection(scope.row.id)" type="danger" size="small" plain>Delete Section</el-button>
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

    <!-- createSectionForm -->
    <el-dialog title="createSectionForm" :visible.sync="createSectionFormVisible">
      <el-form :model="createdSection">
        <el-form-item label="sectionname">
          <el-input v-model="createdSection.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="orderby">
          <el-input v-model="createdSection.orderby" autocomplete="off" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createSectionFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createSection">Confirm</el-button>
      </div>
    </el-dialog>
    <!-- updateSectionForm -->
    <el-dialog title="updateSectionForm" :visible.sync="updateSectionFormVisible">
      <el-form :model="updatedSection">
        <el-form-item label="sectionname">
          <el-input v-model="updatedSection.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="orderby">
          <el-input v-model="updatedSection.orderby" autocomplete="off" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateSectionFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateSection(updatedSection, updatedSection.id)">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {getSection, createSection as creatSection, updateSection as updatSection, deleteSection as delSection} from '@/api/section'

export default {
  data() {
    return {
      SearchSectionName: '',
      listLoading: false,
      Sections:[],
      createSectionFormVisible: false,
      createdSection: {
        title:'',
        orderby: '',
      },
      updateSectionFormVisible: false,
      updatedSection: {
        id:'',
        title:'',
        orderby: '',
      },
      chapterId:''
    }
  },
  methods: {
    getChapterId(){
      this.chapterId = this.$route.params.id;
    },
    fetchData(){
      this.listLoading = true;
      getSection({chapter_id: this.chapterId}).then(res => {
        this.Sections = res.data;
        this.listLoading = false;
      }).catch(e => {
        this.$message({
          type: 'warning',
          message: 'get sections failed'
        })
        this.listLoading = false;
      })
    },
    createSection(){
      creatSection({
        title: this.createdSection.title,
        orderby: this.createdSection.orderby,
        chapter_id: this.chapterId
      }).then(res => {
        if(res.code == 20000){
          this.$message({
            type: 'success',
            message: 'create section succeeded'
          })
        } else {
          this.$message({
            type: 'info',
            message: 'created section failed'
          })
        }
        this.fetchData();
      }).catch(e => {
        console.log(e);
        this.$message({
          type: 'success',
          message: 'created section initially failed'
        })
        this.fetchData();
      })
      this.createSectionFormVisible = false;
    },
    getUpdateSection(id){
      this.Sections.forEach(section => {
        if(section.id == id){
          this.updatedSection.id = section.id,//same as id, which is scope.row.id
          this.updatedSection.title = section.title,
          this.updatedSection.orderby = section.orderby
        }else {
          return;
        }
      })
      this.updateSectionFormVisible = true;
    },
    deleteSection(id){
      this.$confirm('Delete this section', 'Confirmation', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        delSection(id).then(res => {
          if(res.code === 20000){
            this.$message({
              type: 'success',
              message: 'Delete Succeeded!'
            });
          } else {
            this.$message({
              type: 'info',
              message: 'Delete failed!'
            });
          }
          this.fetchData();
        });
      }).catch( e => {
        this.$message({
          type: 'info',
          message: 'Delete Canceled'
        });          
      });
    },
    updateSection(data, id){
      updatSection({
        title: data.title,
        orderby: data.orderby,
        chapter_id: this.chapterId
      }, id).then(res => {
        if(res.code == 20000){
          this.$message({
            type: 'success',
            message: 'updateSection succeeded!'
          });
          this.fetchData();
        }else {
          this.$message({
            type: 'info',
            message: 'updateSection failed!'
          });
          this.fetchData();
        }
      }).catch(e => {
        this.$message({
          type: 'info',
          message: 'updateSection initially failed!'
        });
        this.fetchData();
      })
      this.updateSectionFormVisible = false;
    },
  },
  created() {
    this.getChapterId();
    this.fetchData();
  },
}
</script>