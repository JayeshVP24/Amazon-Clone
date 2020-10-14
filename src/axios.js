import axios from "axios"

const instance = axios.create({
  baseURL:
    // "http://localhost:5001/clone-a4a8a/us-central1/api",
    "https://us-central1-clone-a4a8a.cloudfunctions.net/api",
  //api cloud function URL
})

export default instance
