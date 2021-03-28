import request from '@/utils/request';

export function getBook(){
  return request({
    url: '/book',
    method: 'get'
  })
}

export function createBook(data){
  return request({
    url: '/book',
    method: 'post',
    data: data
  })
}

export function updateBook(data, id){
  return request({
    url:`/book/${id}`,
    method: 'put',
    data
  })
}

export function deleteBook(id){
  return request({
    url: `/book/${id}`,
    method: 'delete'
  })
}