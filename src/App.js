import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import Search from './Search'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {

  state = {
    books : [],
    currentlyReading :[],
    wantToRead :[],
    read : [],
    booksSearch : [],
    loadingBooks:true
  }


  getAllBooks =() => {

    BooksAPI.getAll().then( (books) =>{

        this.setState({
          books : books
          ,currentlyReading : books.filter( b => b.shelf === 'currentlyReading')
          ,wantToRead : books.filter( b => b.shelf === 'wantToRead')
          ,read : books.filter( b => b.shelf === 'read')
          ,loadingBooks : false
         })
      }

    )

  }

  componentDidMount(){
    this.getAllBooks()
  }

  onUpdateShelf = (book, shelf) =>{

    BooksAPI.update(book, shelf).then(
       (b) => {
         this.getAllBooks()
       }
    )

  }

  onSearchBook = (query) =>

    BooksAPI.search(query).then(
      (result) => {

       let booksSearch = !result.error ? result : []

       //this for interate all books searched and sets the current shelf
       //if it is already in any
       for(let i=0; i < booksSearch.length; i++){

          const b = this.state.books.filter(x=> x.id === booksSearch[i].id )

          b.length > 0 && (
              booksSearch[i].shelf =  b[0].shelf
          )

       }

        this.setState({
          booksSearch
        })

      }
    )

    onClearSearch = () => {
      this.setState({
        booksSearch :[]
      })
    }


  render() {
    return (
      <div className="app">

        <Route exact path="/search" render={
            ({ history }) => (
              <Search
                books={ this.state.booksSearch }
                onSearchBook={this.onSearchBook}
                onUpdateShelf={ this.onUpdateShelf }
                onClearSearch={this.onClearSearch}
                 />
            )

          } />


        <Route exact path="/" render={
            () => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>My Reads</h1>
                </div>
                <div className="list-books-content">

                  <div>



                    <Bookshelf shelfName="Currently Reading"
                        onUpdateShelf={ this.onUpdateShelf }
                        books={
                            this.state.currentlyReading
                        }
                        loadingBooks={this.state.loadingBooks}
                       />

                    <Bookshelf shelfName="Wanto to Read"
                      onUpdateShelf={ this.onUpdateShelf }
                      books={
                          this.state.wantToRead
                      }
                      loadingBooks={this.state.loadingBooks}
                       />

                    <Bookshelf shelfName="Read"
                      onUpdateShelf={ this.onUpdateShelf }
                      books={
                          this.state.read
                      }
                      loadingBooks={this.state.loadingBooks}
                      />

                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>

            )
          } />

      </div>
    )
  }
}

export default BooksApp
