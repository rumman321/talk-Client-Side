import {
  FaFacebookSquare,
  FaGithub,
  FaLinkedinIn,
  FaTelegram,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import Swal from "sweetalert2";

const Emailjs = () => {
  const form = useRef();
  // console.log(form);

  const emailSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_YOUR_SERVICE_ID,
        import.meta.env.VITE_YOUR_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_YOUR_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          Swal.fire({
            // position: "top-end",
            icon: "success",
            title: "Your Email has been Send",
            showConfirmButton: false,
            timer: 1500,
          });
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.text}`,
          });
        }
      );
  };
  return (
    <div>
      <h3 className="text-center text-2xl font-bold p-8">Contact Us</h3>
      <div className="container mx-auto px-4 py-12 flex flex-col  items-start justify-between gap-8">
        <div className="w-full ">
          <h3 className="text-center text-xl font-bold p-8">
            Send Message Via Email
          </h3>
          <form
            className=" p-6 rounded-lg shadow-lg"
            ref={form}
            onSubmit={emailSubmit}
          >
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="from_name"
              placeholder="Your Name"
              className="input input-bordered w-full mb-4"
              required
            />

            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="from_email"
              placeholder="Your Email"
              required
              className="input input-bordered w-full mb-4"
            />

            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              placeholder="Type Message"
              name="message"
              required
              className="textarea textarea-bordered w-full mb-4"
            ></textarea>

            <button className="btn bg-red-500 font-bold text-white w-full">
              Send Message
            </button>
          </form>
        </div>
        <div className="w-full  text-center md:text-left">
          <h3 className="text-center text-xl font-bold p-8">
            Social Media Link
          </h3>
          <div className="grid grid-flow-col gap-8 items-center  justify-center ">
            <a
              href="https://t.me/Rummancpa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 text-2xl"
            >
              <FaTelegram size={30} />
            </a>
            <a
              href="https://www.linkedin.com/in/rumman-mahfuz3333/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 text-2xl"
            >
              {" "}
              <FaLinkedinIn size={30} />{" "}
            </a>
            <a
              href="https://www.facebook.com/rumman.mahfuz.2024/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 text-2xl"
            >
              {" "}
              <FaFacebookSquare size={30} />{" "}
            </a>
            <a
              href="https://github.com/rumman321"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <FaGithub size={30} />{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emailjs;
