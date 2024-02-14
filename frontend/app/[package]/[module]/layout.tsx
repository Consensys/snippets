type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return <div className="py-5 md:py-20">{children}</div>;
};

export default Layout;
