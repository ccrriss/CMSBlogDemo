import request from '@/utils/request';

export function getResource(){
  return request({
    url: '/resource',
    method: 'get',
  })
}

export function createResource(data){
  return request({
    url: '/resource',
    method: 'post',
    data: data
  })
} 

export function updateResource(data, id){
  return request({
    url: `/resource/${id}`,
    method: 'put',
    data
  })
}

export function deleteResource(id){
  return request({
    url: `/resource/${id}`,
    method: 'delete'
  })
}