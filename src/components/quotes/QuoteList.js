import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const match = matchPath();
  // console.log(history);
  // console.log(location);
  // console.log(match, "ggg");

  const queryParams = new URLSearchParams(location.search);
  const isSortAsc = queryParams.get("sort") === "asc";
  const changeSortHandler = () => {
    navigate({
      pathname: location.pathname,
      search: `?sort=${isSortAsc ? "desc" : "asc"}`,
    });
    // history.push(`${match.url}?sort=${isSortAsc ? "desc" : "asc"}`);
    sortQuotes(props.quotes, isSortAsc);
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>
          Sort {isSortAsc ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {props.quotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
