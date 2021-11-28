import React, {Component} from "react";
import "./form.css"


export default class Form extends Component {

    state = {
        searchText: "",
        category: "all",
        sortingBy: "relevance"
    }

    submitted = false;

    onBookTitleChange = (e) => {this.setState({searchText: e.target.value})}
    onCategoryChange = (e) => {this.setState({category: e.target.value})}
    onSortingChange = (e) => {this.setState({sortingBy: e.target.value})}

    onSubmit = (e) => {
        e.preventDefault();
        const options = {...this.state};

        if (options.searchText === "") return
        if (this.submitted) return;
        this.submitted = true;

        this.props.onRequest();
        this.props.gbService.configure(options);
        this.props.gbService.getBooks().then((books) => {if (books.totalItems !== null) this.props.onBooksReceived(books)})
                                       .then(() => this.submitted = false);
    }

    render(){
        return (
                <form className="searchForm" onSubmit = {this.onSubmit}>
                    <input type = "text" className="searchPanel" onChange= {this.onBookTitleChange}/>
                    <label className="categoryLabel"><span className="categorySpan">Category</span>
                        <select className ="categoriesSelect" onInput={this.onCategoryChange }>
                            <option>all</option> <option>art</option> <option>biography</option>
                            <option>computers</option> <option>history</option><option>medical</option>
                            <option>poetry</option>
                        </select>
                    </label>
                    <label className="sortingLabel"><span className="sortingSpan">SortingBy</span>
                        <select id = "srtSelect" className ="sortingSelect" onInput={this.onSortingChange}>
                            <option>relevance</option>
                            <option>newest</option>
                        </select>
                    </label>
                    <button className="searchButton" aria-label="Поиск"/>
                </form>
        )
    };
}