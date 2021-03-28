import request from '@/utils/request';

export function getSection(query){
  return request({
    url: `/section`,
    method: 'get',
    params: query
  })
}

export function createSection(data){
  return request({
    url: '/section',
    method: 'post',
    data: data
  })
}

export function updateSection(data, id){
  return request({
    url:`/section/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteSection(id){
  return request({
    url: `/section/${id}`,
    method: 'delete'
  })
}