import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 py-3 z-40">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between text-sm px-4">
          <p className="text-muted-foreground">
            Made with ❤️ by{" "}
            <Link
              to={"https://github.com/venkateshmadari"}
              target="_blank"
              className="hover:text-primary"
            >
              Venkatesh
            </Link>
          </p>
          <p className="text-primary">
            <Link
              className="hover:underline cursor-pointer"
              to={"https://hospital-management-dashboard-nu.vercel.app/"}
              target="_blank"
            >
              Register as doctor ?
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
