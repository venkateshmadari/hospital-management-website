import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/");
  };
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 py-3 z-40">
      <div className="container mx-auto">
        <div className="flex items-center justify-between text-sm px-4">
          <p className="text-muted-foreground">Made with ❤️ by Venkatesh</p>
          <p className="text-primary">
            <span className="hover:underline cursor-pointer" onClick={redirect}>
              Register as doctor ?
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
