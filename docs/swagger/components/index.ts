import {
    image,
    review,
    product,
    productList,
} from "./schemas/products"
import { historyData, loginInput, loginResponse, userData, userDetails, userInput, userResponse, usersList } from "./schemas/users"

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
    HistoryData: historyData
}