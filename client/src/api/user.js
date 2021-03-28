import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/userinfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// for admin/index.vue
export function getUser(){
  return request({
    url: '/user',
    method: 'get',
  })
}

export function createUser(data){
  return request({
    url: '/user',
    method: 'post',
    data: data
  })
} 

export function updateUser(data, id){
  return request({
    url: `/user/${id}`,
    method: 'put',
    data
  })
}

export function deleteUser(id){
  return request({
    url: `/user/${id}`,
    method: 'delete'
  })
}
