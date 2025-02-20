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
            icon: "success",
            title: "Your message has been sent successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          form.current.reset();
        },
        (error) => {
          console.error("Email sending failed:", error); // Log detailed error
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "There was an error sending your message. Please try again later.", // User-friendly error
          });
        }
      );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h3 className="text-center text-3xl font-bold mb-8">Let's Connect</h3>
      <div className="flex flex-col gap-8">
        <div className="w-full">
          <h3 className="text-center text-2xl font-bold mb-6">Send Me a Message</h3>
          <form
            className="p-6 rounded-lg shadow-lg"
            ref={form}
            onSubmit={emailSubmit}
          >
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <input
              type="text"
              name="from_name"
              placeholder="Enter your name"
              className="input input-bordered w-full mb-4"
              required
            />

            <label className="block text-sm font-medium mb-2">Your Email Address</label>
            <input
              type="email"
              name="from_email"
              placeholder="Enter your email address"
              className="input input-bordered w-full mb-4"
              required
            />

            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              placeholder="Type your message here"
              name="message"
              className="textarea textarea-bordered w-full mb-4"
              required
            ></textarea>

            <button className="btn bg-red-500 hover:bg-red-700 font-bold text-white w-full">
              Send
            </button>
          </form>
        </div>
        <div className="w-full text-center md:text-left">
          <h3 className="text-center text-2xl font-bold mb-6">Connect on Social Media</h3>
          <div className="flex flex-col md:flex-row justify-center gap-3  md:gap-8 items-center">
            <a
              href="https://t.me/Rummancpa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 text-2xl flex items-center gap-2" // Added flex and gap
            >
              <FaTelegram size={30} /> <span>Telegram</span> {/* Added platform name */}
            </a>
            <a
              href="https://www.linkedin.com/in/rumman-mahfuz3333/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 text-2xl flex items-center gap-2" // Added flex and gap
            >
              <FaLinkedinIn size={30} /> <span>LinkedIn</span> {/* Added platform name */}
            </a>
            <a
              href="https://www.facebook.com/rumman.mahfuz.2024/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 text-2xl flex items-center gap-2" // Added flex and gap
            >
              <FaFacebookSquare size={30} /> <span>Facebook</span> {/* Added platform name */}
            </a>
            <a
              href="https://github.com/rumman321"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 text-2xl flex items-center gap-2" // Added flex and gap
            >
              <FaGithub size={30} /> <span>GitHub</span> {/* Added platform name */}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emailjs;