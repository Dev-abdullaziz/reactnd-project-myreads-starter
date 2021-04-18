import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'
import { Route } from 'react-router'
import {Link} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    query: '',
    searchResult: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: [...data]
      })
    });
  }

  moveToShelf = (book,event) => {
    BooksAPI.update(book,event.target.value).then(data => this.setState({ shelves: {...data} })) 
    if(this.state.books.filter(oneBook => oneBook.id === book.id).length>0){
      let newBooks = [...this.state.books]
      let index = newBooks.findIndex(oldbook => oldbook.id === book.id)
      newBooks[index].shelf = event.target.value
      this.setState(() => ({
        books: [...newBooks]
      }))
    } else {
      let newBooks = [...this.state.searchResult]
      let index = newBooks.findIndex(oldbook => oldbook.id === book.id)
      newBooks[index].shelf = event.target.value
      this.setState(() => ({
        searchResult: [...newBooks]
      }))
    }
  }

  closeSearch(){
    this.setState({ showSearchPage: false })
  }

  updateQuery(event) {
    this.setState({ query: event.target.value})
    BooksAPI.search(event.target.value).then(data => 
      { 
        this.setState({searchResult: data})
      }
    )
  }


  render() {
    return (
      <div className="app">
        <Route path='/search'>
          <Search 
            value={this.state.query} 
            result={this.state.searchResult} 
            moveToShelf={this.moveToShelf} 
            close={() => this.closeSearch()} 
            update={this.updateQuery.bind(this)}/>
        </Route>
        <Route exact path='/'>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf name='Currently Reading' moveToShelf={this.moveToShelf} books={this.state.books.filter(book => book.shelf === 'currentlyReading')}/>
                <BookShelf name='Want to Read' moveToShelf={this.moveToShelf} books={this.state.books.filter(book => book.shelf === 'wantToRead')}/>
                <BookShelf name='Read' moveToShelf={this.moveToShelf} books={this.state.books.filter(book => book.shelf === 'read')}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" className="open-search-Link"></Link>
            </div>
          </div>
        </Route>
      </div>
    )
  }
}

export default BooksApp
