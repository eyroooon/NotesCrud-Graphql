import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Main from "./Pages/Main";
import { AuthProvider } from "./Context/auth";
import { setContext } from "apollo-link-context";

function App() {
  const httpLink: any = createHttpLink({
    uri: "http://localhost:3001/graphql",
  });

  const authLink: any = setContext(() => {
    const token = localStorage.getItem("jwtToken");
    console.log(token);
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Header />
        <Main />
        <Footer />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
