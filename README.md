# CMSBlogDemo
### Introduction:

​	This demo project is base on:

#### Backend: 

**Egg.js** and **MySQL** with **egg-sequelize** which is an ORM framework for CURD operations. The html files for front end display are stored in view/frontend folder, and the index.html built from vue will be put into view/admin folder. Controllers and services are similar.

#### Frontend Admin: 

​	**Vue-admin-template**, template based on **Vue** with some useful features built-in, such as encapsulation of Axios, Element-ui and so on. (official github page: https://github.com/PanJiaChen/vue-admin-template)

​	**MavonEditor** as Markdown Editor.

#### Frontend Display: 

​	**Bootstrap**,**Nunjucks**(egg-view-nunjucks), **Swiper** and **mz-modules** which is used for uploading images. 

​	There are blog, book, chapter, section, content, user, video and resource models in this project. For book, chapter has a foreign key references book's primary key for association. Section and content have foreign keys reference to chapter and section respectively. In blog and content, there are md_text and html_text, where html_text is rendered from markdown content created in markdown editor. Request from admin site will take token in request.header then it will check whether code from response is 20000 which is set in backend. Images uploaded from different pages will be stored in different folders respectively.



### Screen shots:

![image-1](https://github.com/ccrriss/CMSBlogDemo/blob/main/screenshots/image-1.png)



![image-2](https://github.com/ccrriss/CMSBlogDemo/tree/main/screenshots/image-2.png)




![image-3](https://github.com/ccrriss/CMSBlogDemo/tree/main/screenshots/image-3.png)





### Future plan:

1. Finish Search Part for both frontend display and admin sites with different .
2. Add encryption(Md5) for storing encrypted password in database.
3. Better CSS design for frontend display.
4. Nodemailer will be used for sending email with a contact us page.
5. Add more paginations for pages which may have hundreds or more items in real life.

