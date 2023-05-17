type AuthorProps = {
  children: React.ReactNode;
};

const Author = ({ children }: AuthorProps) => {
  return (
    <div className="author">{children}</div>
  )
}

export default Author;