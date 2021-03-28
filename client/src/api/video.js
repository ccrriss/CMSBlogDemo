import request from '@/utils/request';

export function getVideo(query){
  return request({
    url: '/video',
    method: 'get',
    params: query
  })
}

export function createVideo(data){
  return request({
    url: '/video',
    method: 'post',
    data: data
  })
} 

export function updateVideo(data, id){
  return request({
    url: `/video/${id}`,
    method: 'put',
    data
  })
}

export function deleteVideo(id){
  return request({
    url: `/video/${id}`,
    method: 'delete'
  })
}