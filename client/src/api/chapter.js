import request from '@/utils/request';

export function getChapter(id){
  return request({
    url: `/chapter?book_id=${id}`,
    method: 'get'
  })
}

export function createChapter(data){
  return request({
    url: '/chapter',
    method: 'post',
    data: data
  })
}

export function updateChapter(data, id){
  return request({
    url:`/chapter/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteChapter(id){
  return request({
    url: `/chapter/${id}`,
    method: 'delete'
  })
}