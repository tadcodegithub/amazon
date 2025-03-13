import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://tadetek.com/",
})

export { axiosInstance }
