type DescriptionProps = {
  children: React.ReactNode;
};

const Description = ({ children }: DescriptionProps) => {
  return (
    <div className="description">{children}</div>
  )
}

export default Description;