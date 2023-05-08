import Header from '~/layouts/components/Header';

function HeaderOnly({ children }) {
  return (
    <div className="container">
      <Header />
      <div>{children}</div>
    </div>
  );
}
export default HeaderOnly;
