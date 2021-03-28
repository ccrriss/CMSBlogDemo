import request from '@/utils/request';

export function getContent(query){
  return request({
    url: `/sectionEdit`,
    method: 'get',
    params: query
  })
}

export function createContent(data){
  return request({
    url: '/sectionEdit',
    method: 'post',
    data: data
  })
}

export function updateContent(data, id){
  return request({
    url:`/sectionEdit/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteContent(id){
  return request({
    url: `/sectionEdit/${id}`,
    method: 'delete'
  })
}