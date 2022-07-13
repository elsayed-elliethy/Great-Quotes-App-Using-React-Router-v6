import React, { Component, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MainNav from "./components/layout/MainNav";
import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import QuoteDetails from "./pages/QuoteDetails";
import NotFound from "./pages/NotFound";
import Comments from "./components/comments/Comments";
function App() {
  return (
    <div>
      <MainNav></MainNav>
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/all-quotes" />} />

          <Route path="/all-quotes" element={<AllQuotes />} />

          <Route path="/new-quote" element={<NewQuote />} />

          <Route path="/all-quotes/:quoteId" element={<QuoteDetails />}>
            <Route path="comments" element={<Comments />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
