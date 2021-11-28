import React, {Component} from "react";
import Form from "../Form";
import BooksSection from "../BooksSection";
import GBService from "../GBService"
import "./application.css";

export default class Application extends Component {

    state = {
        booksList: {},
        status: "off"
    }

    onRequest = () => {this.setState({status: "receiving"})}
    onBooksReceived = (booksList) => {this.setState({ booksList, status: "received"})}
    onPageBuilt = () => {this.setState({status: "pageView"})}
    onServiceError = () => {this.setState({status: "error"})}

    gbService = new GBService({onServiceError: this.onServiceError});

    render() {
        return (
            <main>
                <section className="searchSection">
                    <h2>Search for books</h2>
                    <Form gbService = {this.gbService} onRequest = {this.onRequest}
                          onBooksReceived = {this.onBooksReceived} />
                </section>
                <section className="contentSection">
                    <BooksSection gbService = {this.gbService}  status = {this.state.status}
                                  booksList = {this.state.booksList} onRequest = {this.onRequest}
                                  onPageBuilt = {this.onPageBuilt}/>
                </section>
            </main>
        )
    }
}