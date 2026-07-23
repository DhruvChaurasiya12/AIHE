import { useNavigate } from "react-router-dom";

interface SimpleCourseCardProps {
  id: string;
  title: string;
  image: string;
  isCatalog?: boolean;
}

const SimpleCourseCard = ({
  id,
  title,
  image,
  isCatalog = false,
}: SimpleCourseCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(isCatalog ? `/courses/catalog/${id}` : `/courses/${id}`)
      }
      className="group cursor-pointer overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-primary transition-colors group-hover:text-orange-500">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default SimpleCourseCard;
