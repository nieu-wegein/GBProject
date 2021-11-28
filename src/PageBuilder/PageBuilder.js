import React from "react";
import "./bookPage.css";


export default class PageBuilder {

    constructor(gbService) {
        this.gbService = gbService;
    }

    async buildPage(id) {

        const {volumeInfo} = await this.gbService.getBookById(id)

        return (
            <article className="bookPage">
                <div className = "bookPage_wrapper">
                    <div className = "bookPage_coverContainer">
                        <img className="bookPage_cover" src= {"imageLinks" in volumeInfo ? volumeInfo.imageLinks.small
                                                                 :"img/NoImage.jpg"} alt="Обложка книги"/>
                    </div>
                    <div className="bookPage_info">
                        <span className="bookPage_category">{volumeInfo.categories || [""]}</span>
                        <h3 className="bookPage_title">{volumeInfo.title || [""]} </h3>
                        <span className="bookPage_authors">{"authors" in volumeInfo ? volumeInfo.authors.join(", ")
                            : [""]}</span>
                        <p className="bookPage_description">{volumeInfo.description || [""]} </p>
                    </div>
                </div>
            </article>)
    }
}



