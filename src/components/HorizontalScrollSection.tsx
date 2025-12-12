interface HorizontalScrollSectionProps {
  title: string;
  children: React.ReactNode;
}

const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({
  title,
  children,
}) => {
  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
        {children}
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
