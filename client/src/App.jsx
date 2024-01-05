import style from "./app.module.css"
import ApolloClient from "apollo-boost"
import {ApolloProvider} from 'react-apollo'
import BookList from "./component/booklist.jsx"
import AddBook from "./component/addBook.jsx"
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
})
function App() {


  return (
    <>
      <ApolloProvider client={client}>
        <p>Shahabuddin Reading list</p>
        <BookList/>
        <AddBook/>
      </ApolloProvider>
    </>
  )
}

export default App
