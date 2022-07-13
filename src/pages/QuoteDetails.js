import { useEffect, useState } from "react";
import {
  Route,
  useParams,
  Link,
  useNavigate,
  useLocation,
  Routes,
  Outlet,
} from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const QuoteDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  // const match = matchPath();
  //////////
  const { isLoading, error, requestFn: getQuotes } = useHttp();
  const [allQuots, setAllQuots] = useState([]);
  useEffect(() => {
    const transformData = (data) => {
      const loadedArray = [];
      Object.entries(data).map(([key, value]) => {
        return loadedArray.push({
          id: key,
          text: value.text,
          author: value.author,
        });
      });
      setAllQuots(loadedArray);
    };
    getQuotes(
      {
        url: "https://react-router-fcb08-default-rtdb.firebaseio.com/quotes.json",
      },
      transformData
    );
  }, [getQuotes]);
  /////////
  // const quote = allQuots.find((quote) => quote.id === params.quoteId);
  const [quote] = allQuots.filter((quote) => quote.id === params.quoteId);
  const targetQuote = { ...quote };

  if (isLoading) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }
  if (!error && !isLoading && targetQuote.text === "") {
    return <p>No Quote Found</p>;
  }

  return (
    <div>
      <HighlightedQuote text={targetQuote.text} author={targetQuote.author} />
      {/* <Routes>
        <Route
          path=""
          element={
            <div className="centered">
              <Link className="btn--flat" to="comments">
                Load Comments
              </Link>
            </div>
          }
        />
      </Routes> */}
      {location.pathname === `/all-quotes/${params.quoteId}` && (
        <div className="centered">
          <Link
            className="btn--flat"
            to={`/all-quotes/${params.quoteId}/comments`}
          >
            Load Comments
          </Link>
        </div>
      )}
      {/* <Routes>
        <Route path="comments" element={<Comments></Comments>} />
      </Routes> */}
      <Outlet />
    </div>
  );
};
export default QuoteDetails;
