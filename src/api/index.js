import request from "@/utils/request";
const api ={}
export function loginPage(data) {
  return request({
    url: 'home/testStateCount',
    method: 'post',
    data: data
  })
}

export function test(params) {
  return request({
    url: 'home/testStateCount',
    method: 'get',
    params: params
  })
}
// export const getroomapi = (data) => getapi("/api/RoomApi/live", data);

