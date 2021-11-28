import React, {Component} from "react";
import BookCard from "../BookCard";
import "./booksList.css";

export default class BooksList extends Component {

    state = {
        totalItems: 0,
        booksCards: [],
        startIndex: 0,
    }


    componentDidMount() {
        this.buildCards(this.props.booksList);
    }

    buildCards({items, totalItems}) {

        const filteredList = items.filter((book) => {
            for (let i = 0; i < this.state.booksCards.length; i++){
                if (this.state.booksCards[i].key === book.id) return false;
            }
            return true;
        })

        const booksCards = filteredList.map((book) => {
            return (
                <li key = {book.id} className="booksList_item">
                    <BookCard id = {book.id} info = {book.volumeInfo} onCardClick = {this.props.onCardClick}/>
                </li>
            )
        });

        if (totalItems === 0 || filteredList.length === 0) this.loadButton = null;

        this.setState((state) => {
            return {
                totalItems: totalItems,
                booksCards: [...state.booksCards, ...booksCards],
                startIndex: state.startIndex + booksCards.length
            }
        });

    }

    loadMore = (e) => {
        e.target.classList.remove("loadButton")
        e.target.classList.add("spinnerButton")
        this.props.gbService.getBooks(this.state.startIndex)
            .then((books) => this.buildCards(books))
            .then(() => {e.target.classList.remove("spinnerButton"); e.target.classList.add("loadButton")})
    }

    loadButton =  <button className="loadButton" onClick={this.loadMore}>
        <span>Загрузить еще</span></button>


    render() {
        return (
            <React.Fragment>
                <p className="totalItems">{this.state.totalItems} books found</p>
                <ul className="booksList">
                    {this.state.booksCards}
                </ul>
                {this.loadButton}
            </React.Fragment>)
    }
}