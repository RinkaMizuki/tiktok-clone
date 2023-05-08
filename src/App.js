import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import { Fragment } from 'react';
import AuthContextProvider from './context';

function App() {
  return (
    <AuthContextProvider>
      <Router>
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
      </Router>
    </AuthContextProvider>
  );
}

export default App;
