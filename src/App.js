import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import { Fragment } from 'react';
import AuthContextProvider from './context';
import ContextProvider from './context/ContextProvider';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <ContextProvider>
          <div className="App">
            <Routes>
              {publicRoutes.map((route, index) => {
                const Layout = route.layout === null ? Fragment : route.layout || DefaultLayout;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <route.component />
                      </Layout>
                    }
                  ></Route>
                );
              })}
            </Routes>
          </div>
        </ContextProvider>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
