interface TitleProps extends React.HtmlHTMLAttributes<HTMLHeadElement> {
  content: string;
}

export default function Title({ content, className, ...props }: TitleProps) {
  const combinedClassName = `font-inria text-xl md:text-2xl font-bold ${
    className || ""
  }`;
  return (
    <h1 className={combinedClassName} {...props}>
      {content}
    </h1>
  );
}
