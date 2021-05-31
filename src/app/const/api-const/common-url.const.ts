import { ApiTemplate } from "services/axios/common-services.const";

const GET_ALL_TAGS_DATASET: ApiTemplate = {
  method: "GET",
  URL: `common/all-tags`
}

const GET_RECOMMEND_LIST: ApiTemplate = {
  method: "GET",
  URL: `common/recommend-list`
}


const GET_TRENDING_DATASET_TAGS: ApiTemplate = {
  method: "GET",
  URL: `common/trending`
}

const GET_RECOMMEND_ARRAY: ApiTemplate = {
  method: "GET",
  URL: `common/my-recommend`
}

export {
  GET_ALL_TAGS_DATASET,
  GET_RECOMMEND_LIST,
  GET_TRENDING_DATASET_TAGS,
  GET_RECOMMEND_ARRAY
};
