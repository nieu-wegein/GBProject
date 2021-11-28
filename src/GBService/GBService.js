import React, {Component} from "react";

export default class GBService extends Component {

    config = {
        searchText: "",
        category: "all",
        sortingBy: ""
    }

    configure(options) {
        this.config = options
    }

    async getBooksJSON(url) {
        try {
            const booksList = await fetch(url);
            return await booksList.json();
        }
        catch (e) {
            return {totalItems: null }
        }
    }

   async getBooks(startIndex = 0) {

        const config = this.config
        const url = "https://www.googleapis.com/books/v1/volumes?q=" + config.searchText
                    + (config.category === "all" ? "" : `+subject:${config.category}` )
                    + (config.sortingBy === "newest" ? "&orderBy=newest" : "")
                    + `&startIndex=${startIndex}&maxResults=30`
        const bookListJSON = await this.getBooksJSON(url).then(books => {
            if (books.totalItems === null) this.props.onServiceError();
            if (books.totalItems === 0 || books.totalItems <= startIndex) books.items = [];
            return books;
        })
        return {items: bookListJSON.items, totalItems: bookListJSON.totalItems}
    }

    async getBookById(id){
        const url = `https://www.googleapis.com/books/v1/volumes/${id}`
        const bookListJSON = await this.getBooksJSON(url);
        return bookListJSON;
    }


}

