import axios from "axios";
import { BASEPATH } from "../../constants";
import { getCurrentUser } from '../storage/index';

function request(method, url, data = {}) {
  return axios({
    method: method,
    url: url,
    data: data,
    dataType: "json",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  });
}

export function getItems(offset, limit, keyword='', sort_col='', sort_dir='') {
  console.log('api', offset, limit)
  return request(
    "get",
    `${BASEPATH}/api/items?page=${offset}&per_page=${limit}&keyword=${keyword}&sort_col=${sort_col}&sort_dir=${sort_dir}?email=${getCurrentUser}`
  ).then(function(res) {
    return res.data;
  });
}

export function bidNow(item, bidPrice) {
  console.log('bidnow api', item)
  return request(
    "post",
    `${BASEPATH}/api/items/${item.id}/auctions`,{
      price: bidPrice,
      email: getCurrentUser()
    }
  ).then(function(res) {
    alert('You have successfully made the bid.')
    return res.data;
  }).catch((e) => {
    console.log('error',e.response.data.error);
    alert(e.response.data.error);
  })
}

export function autoBidActive(item) {
  console.log('autobid active api', item)
  return request(
    "post",
    `${BASEPATH}/api/items/${item.id}/autobids`,{
      email: getCurrentUser()
    }
  ).then(function(res) {
    return res.data;
  }).catch((e) => {
    alert(e.response.data.error);
    console.log('error', e.response.data.error);
  })
}

export function autoBidInactive(item) {
  console.log('autobid inactive api', item)
  return request(
    "post",
    `${BASEPATH}/api/items/${item.id}/autobids/remove`,{
      email: getCurrentUser()
    }
  ).then(function(res) {
    return res.data;
  }).catch((e) => {
    console.log('error', e.response.data.error);
    alert(e.response.data.error);
  })
}

