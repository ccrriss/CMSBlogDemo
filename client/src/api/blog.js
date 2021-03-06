import request from '@/utils/request';

export function getBlog(query){
  return request({
    url: `/blog`,
    method: 'get',
    params: query
  })
}

export function getBlogDetail(id){
  return request({
    url: `/blog/${id}`,
    method: 'get'
  })
}

export function createBlog(data){
  return request({
    url: '/blog',
    method: 'post',
    data: data
  })
}

export function updateBlog(data, id){
  return request({
    url:`/blog/${id}`,
    method: 'put',
    data
  })
}

export function deleteBlog(id){
  return request({
    url: `/blog/${id}`,
    method: 'delete'
  })
}