import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="container mx-auto mb-4">
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">Made with ❤️ by Venkatesh</p>
        <p className="text-primary">
          <a href="#">Register as doctor ? </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
