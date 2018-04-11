import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import { BeatLoader } from 'react-spinners'

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onSearchBook: PropTypes.func.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
    onClearSearch:PropTypes.func.isRequired,

  }


 state = {
     loadingBooks : false
 }

  shelfs = [
    {name : "Want to Read" , value: 'wantToRead' },
    {name : "Currently Reading" , value: 'currentlyReading'},
    {name : "Read" , value: 'read' }
   ]


  timer ={}
  timeout = 1000
  query =''

  handleSearch = (e) =>{
    e.preventDefault()

    this.query = e.target.value

    if(!this.state.loadingBooks && this.query !==''){
        this.setState({loadingBooks : true})
    }

    //Here we make a server request only 1 sec after the user stops typing
    //to avoid it makes multiples requests
    clearTimeout(this.timer);

     if(this.query !== '') {

      this.timer = setTimeout(()=>{

              this.props.onSearchBook(this.query).then(
                this.setState({loadingBooks : false})
              )

          }, this.timeout)

    }else{
      
      this.setState({loadingBooks : false})
      this.props.onClearSearch()

    }



  }

  render(){

    const { books, onUpdateShelf }=this.props


//console.log(this.loadingBooks)

    return(

      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              Ho wever, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"
              onKeyUp={this.handleSearch}
              />

          </div>

        </div>


        <div className="search-books-results">

          <div className='sweet-loading books-grid'>
            <BeatLoader
              color={'#60ac5d'}
              loading={this.state.loadingBooks}
              />
          </div>


          <ol className="books-grid">


            {books.map( (book) => (

              <Book
                bookData={book}
                onUpdateShelf={ onUpdateShelf }
                key={book.id}
                 />

            ))}

          </ol>
        </div>






      </div>

    )

  }

}

export default Search
