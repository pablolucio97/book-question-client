interface SubtitleProps extends React.HtmlHTMLAttributes<HTMLHeadElement> {
  content: string;
}

export default function Subtitle({
  content,
  className,
  ...props
}: SubtitleProps) {
  const combinedClassName = `font-inria text-lg md:text-xl  ${className || ""}`;
  return (
    <h1 className={combinedClassName} {...props}>
      {content}
    </h1>
  );
}
