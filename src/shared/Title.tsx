interface TitleProps {
  title: string;
  subtitle: string;
}

const Title = ({ title, subtitle }: TitleProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
    </div>
  );
};

export default Title;
