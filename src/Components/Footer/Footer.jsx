import Emailjs from "../Email/Emailjs";

const Footer = () => {
  return (
    <div>
      <div className="w-full">
        <Emailjs></Emailjs>
        </div>
      <footer className="footer footer-center  text-base-content rounded p-5">
        
        <aside>
          <p className="font-bold">
            Copyright © {new Date().getFullYear()} - All right reserved by TALK
             Ltd.
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
