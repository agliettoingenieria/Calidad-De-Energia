// const LineDecorator = () => (
//   <div className="decorator line-decorator min-h-full rounded-full"></div>
// );
export const P = ({ children }) => (
  <div className="line-decorator relative flex gap-2">
    <p>{children}</p>
  </div>
);
