import { image, review, product, productList } from './schemas/products'
import {
  discusInput,
  discusResponse,
  discusReplyInput,
  discusReplyResponse
} from './schemas/discus'
import {
  historyData,
  loginInput,
  loginResponse,
  userData,
  userDetails,
  userInput,
  userResponse,
  usersList
} from './schemas/users'
import { historyInput, historyResponse } from './schemas/history'

export const detailSchemas = {
  ProductList: productList,
  Product: product,
  Image: image,
  Review: review,
  UserInput: userInput,
  UserResponse: userResponse,
  UserData: userData,
  LoginInput: loginInput,
  LoginResponse: loginResponse,
  UsersList: usersList,
  UserDetails: userDetails,
  HistoryData: historyData,
  DiscusInput: discusInput,
  DiscusReplyInput: discusReplyInput,
  DiscusResponse: discusResponse,
  DiscusReplyResponse: discusReplyResponse,
  HistoryInput: historyInput,
  HistoryResponse: historyResponse
}
