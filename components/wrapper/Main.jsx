import { Header } from '../Header';

export default ({ children, className }) => (
  <>
    <Header />
    <div className={className}>{children}</div>
  </>
);
