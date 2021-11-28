import React, {Component} from "react";
import BooksList from "../BooksList";
import PageBuilder from "../PageBuilder";
import Spinner from "../img/Spinner.svg";
import "./booksSection.css";



export default class BooksSection extends Component {

    pb = new PageBuilder(this.props.gbService)
    page = null;

    onCardClick = (obj) => {
        this.props.onRequest();
       this.page = this.pb.buildPage(obj.id, this.props.onPageBuilt)
                          .then((page) => this.page = page)
                          .then(this.props.onPageBuilt);
    }

    render() {

            switch(this.props.status) {
                case "off": return <ul className="booksList"/>;
                case "receiving":return <Spinner/>
                case "received": return <BooksList gbService = {this.props.gbService} booksList= {this.props.booksList}
                                                    onCardClick = {this.onCardClick}/>;
                case "pageView": return this.page;
                case "error": return <p className="error">Упс! Что-то пошло не так :(</p>;

        }
    }
}
