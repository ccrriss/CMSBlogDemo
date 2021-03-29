'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const checkToken = app.middleware.checktoken();
  const { router, controller } = app;

  // frontend
  router.get('/', controller.home.index);
  router.get('/blog', controller.blog.getBlogList);
  router.get('/blog/:id',controller.blog.getBlogDetail);
  router.get('/video', controller.video.getVideoList);
  router.get('/video/:id', controller.video.getVideoDetail);
  router.get('/resource', controller.resource.getResourceList);
  router.get('/book', controller.book.getBookList);
  router.get('/book/:id', controller.book.toFirstSection);
  router.get('/section/:id', controller.section.getSectionDetail);
  router.get('/section_content/:id', controller.section.getSectionContent);
  router.get('/login', controller.frontend.index);
  router.get('/search', controller.search.getSearchList);
  //admin frontend
  router.resources('book', '/api/book', checkToken, controller.book);
  router.resources('chapter', '/api/chapter', checkToken, controller.chapter);
  router.resources('section', '/api/section', checkToken, controller.section);
  router.resources('sectionEdit', '/api/sectionEdit', checkToken, controller.sectionEdit);
  router.resources('blog', '/api/blog', checkToken, controller.blog);
  router.resources('resource', '/api/resource', checkToken, controller.resource);
  router.resources('video', '/api/video', checkToken, controller.video);
  router.resources('user', '/api/user', checkToken, controller.user);
  router.post('/api/login', controller.admin.login);
  router.get('/api/userinfo', controller.admin.userinfo);
  
  // for image uploading
  router.post('/api/upload', controller.upload.index);
  router.post('/api/downloadImg', controller.download.downloadImg);
  router.post('/api/blogImg', controller.blog.downloadImg);
  router.post('/api/bookImg', controller.book.downloadImg);
  router.post('/api/SectionContentImg', controller.sectionEdit.downloadImg);
};
