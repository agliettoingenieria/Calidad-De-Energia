// export const PointDecorator = () => (
//   <div className="decorator point rounded-full"></div>
// );

export const Title = ({ children }) => {
  return (
    <h1 className="relative decorator point-decorator font-bold flex items-center gap-2 text-4xl">
      {children}
    </h1>
  );
};

export const Subtitle = ({ children }) => {
  return (
    <h2 className="relative decorator point-decorator font-semibold flex items-center gap-2 text-2xl">
      {children}
    </h2>
  );
};
