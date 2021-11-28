import React from "react";
import "./bookCard.css";


const BookCard = ({id, info, onCardClick}) => {

    const onClick = () => {
        onCardClick({id})
    }

    return (
        <article className = "bookCard" onClick={onClick}>
            <div className ="bookCard_coverContainer">
                <img className = "bookCard_cover" alt = "Обложка книги"
                     src = {"imageLinks" in info ? info.imageLinks.thumbnail
                                                         :"img/NoImage.jpg"} />
            </div>
            <div className="bookCard_info">
                <span className = "bookCard_authors">{"authors" in info ? info.authors.join(", ") : ""}</span>
                <h3 className = "bookCard_title">{info.title}</h3>
                <span className = "bookCard_category">{"categories" in info ? info.categories[0] : ""}</span>
            </div>
        </article>
    )
}

export default BookCard;