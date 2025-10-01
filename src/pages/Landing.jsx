import img1 from "../assets/home1.webp";
import img2 from "../assets/home2.webp";
import img3 from "../assets/home3.webp";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#fdf8f4] text-[#222222] min-h-screen">
      {/* NavBar */}
      <div className="relative flex size-full flex-col overflow-x-hidden">
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#fdf8f4]/80 backdrop-blur-sm border-b border-solid border-[#ede8e5] transition-shadow duration-300 hover:shadow-md">
          <nav className="container mx-auto flex items-center justify-between whitespace-nowrap px-6 py-4">
            <a href="#" className="flex item-center gap-3 text-[#222222]">
              <h1 className="text-[#222222] text-2xl font-bold tracking-tight">
                RoomVista
              </h1>
            </a>
            <button
              onClick={() => {
                navigate("/editor");
              }}
              className="md:flex items-center justify-center rounded-lg h-10 px-6 bg-[#8d6e5c] text-white text-base font-bold shadow-sm hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Get Started
            </button>
          </nav>
        </header>
      </div>
      <main className="flex-grow pt-24">
        {/* Intro */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter text-[#222222]">
                Design Your Dream Space, Effortlessly
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                Transform your vision into reality with our intuitive 2D room
                design tool. Create, customize, and visualize your perfect space
                with RoomVista.
              </p>
              <div className="flex justify-center lg:justify-start">
                <button
                  className="flex min-w-[180px] max-w-md items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-[#8d6e5c] text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 truncate"
                  onClick={() => {
                    navigate("/editor");
                  }}
                >
                  Get Started Now
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full h-[450px]">
              {/* Item 1 */}
              <div
                className="col-span-2 row-span-2 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 bg-cover bg-center"
                style={{ backgroundImage: `url(${img1})` }}
              ></div>

              {/* Item 2 */}
              <div
                className="col-span-1 row-span-1 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 bg-cover bg-center"
                style={{ backgroundImage: `url(${img2})` }}
              ></div>

              {/* Item 3 */}
              <div
                className="col-span-1 row-span-1 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 bg-cover bg-center"
                style={{ backgroundImage: `url(${img3})` }}
              ></div>
            </div>
          </div>
        </section>
        {/* Features */}
        <section className="py-24 bg-[#fbf7f4]" id="features">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#222222]">
                Powerful Features, Simple Interface
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Explore the tools that make RoomVista the ultimate choice for
                your interior design projects.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col gap-4 rounded-2xl border border-[#ede8e5] bg-white p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="bg-[#d7bfae] rounded-full p-3 w-max">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#8d6e5c"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <title>drag-arrow</title>{" "}
                      <g id="Layer_2" data-name="Layer 2">
                        {" "}
                        <g id="invisible_box" data-name="invisible box">
                          {" "}
                          <rect width="48" height="48" fill="none"></rect>{" "}
                        </g>{" "}
                        <g id="icons_Q2" data-name="icons Q2">
                          {" "}
                          <path d="M45.4,22.6l-5.9-6a2.1,2.1,0,0,0-2.7-.2,1.9,1.9,0,0,0-.2,3L39.2,22H26V8.8l2.6,2.6a1.9,1.9,0,0,0,3-.2,2.1,2.1,0,0,0-.2-2.7l-6-5.9a1.9,1.9,0,0,0-2.8,0l-6,5.9a2.1,2.1,0,0,0-.2,2.7,1.9,1.9,0,0,0,3,.2L22,8.8V22H8.8l2.6-2.6a1.9,1.9,0,0,0-.2-3,2.1,2.1,0,0,0-2.7.2l-5.9,6a1.9,1.9,0,0,0,0,2.8l5.9,6a2.1,2.1,0,0,0,2.7.2,1.9,1.9,0,0,0,.2-3L8.8,26H22V39.2l-2.6-2.6a1.9,1.9,0,0,0-3,.2,2.1,2.1,0,0,0,.2,2.7l6,5.9a1.9,1.9,0,0,0,2.8,0l6-5.9a2.1,2.1,0,0,0,.2-2.7,1.9,1.9,0,0,0-3-.2L26,39.2V26H39.2l-2.6,2.6a1.9,1.9,0,0,0,.2,3,2.1,2.1,0,0,0,2.7-.2l5.9-6A1.9,1.9,0,0,0,45.4,22.6Z"></path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#222222] text-xl font-bold">
                    Intuitive Drag &amp; Drop
                  </h3>
                  <p className="text-gray-600 text-base">
                    Easily arrange furniture, walls, and decor with our simple
                    drag and drop interface.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border border-[#ede8e5] bg-white p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="bg-[#d7bfae] rounded-full p-3 w-max">
                  <svg
                    className="w-8 h-8"
                    fill="#8d6e5c"
                    viewBox="0 0 512 512"
                    enableBackground="new 0 0 512 512"
                    id="Layer_1"
                    version="1.1"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    stroke="#8d6e5c"
                    strokeWidth="8.192"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <path d="M406.671,343.078H105.329c-13.788,0-25.005-9.746-25.005-21.725v-76.212c0-11.979,11.217-21.725,25.005-21.725h301.342 c13.788,0,25.005,9.746,25.005,21.725v76.212C431.676,333.333,420.459,343.078,406.671,343.078z M100.324,321.208 c0.352,0.604,2.129,1.87,5.005,1.87h301.342c2.876,0,4.653-1.265,5.005-1.87v-75.922c-0.352-0.604-2.128-1.87-5.005-1.87H105.329 c-2.877,0-4.653,1.266-5.005,1.87V321.208z"></path>{" "}
                        </g>{" "}
                        <g>
                          {" "}
                          <path d="M378.537,243.416H133.463c-5.522,0-10-4.477-10-10v-89.874c0-5.523,4.478-10,10-10h245.074c5.522,0,10,4.477,10,10v89.874 C388.537,238.939,384.06,243.416,378.537,243.416z M143.463,223.416h225.074v-69.874H143.463V223.416z"></path>{" "}
                        </g>{" "}
                        <g>
                          {" "}
                          <path d="M90.324,378.458c-5.522,0-10-4.477-10-10v-47.104c0-5.523,4.478-10,10-10s10,4.477,10,10v47.104 C100.324,373.98,95.847,378.458,90.324,378.458z"></path>{" "}
                        </g>{" "}
                        <g>
                          {" "}
                          <path d="M421.676,378.458c-5.522,0-10-4.477-10-10v-47.104c0-5.523,4.478-10,10-10s10,4.477,10,10v47.104 C431.676,373.98,427.198,378.458,421.676,378.458z"></path>{" "}
                        </g>{" "}
                        <g>
                          {" "}
                          <path d="M225.782,243.416H174.1c-5.522,0-10-4.477-10-10v-40.012c0-5.523,4.478-10,10-10h51.683c5.522,0,10,4.477,10,10v40.012 C235.782,238.939,231.305,243.416,225.782,243.416z M184.1,223.416h31.683v-20.012H184.1V223.416z"></path>{" "}
                        </g>{" "}
                        <g>
                          {" "}
                          <path d="M337.482,243.416h-51.682c-5.522,0-10-4.477-10-10v-40.012c0-5.523,4.478-10,10-10h51.682c5.522,0,10,4.477,10,10v40.012 C347.482,238.939,343.005,243.416,337.482,243.416z M295.801,223.416h31.682v-20.012h-31.682V223.416z"></path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#222222] text-xl font-bold">
                    Vast Furniture Library
                  </h3>
                  <p className="text-gray-600 text-base">
                    Choose from thousands of real furniture items to furnish
                    your virtual space.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border border-[#ede8e5] bg-white p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="bg-[#d7bfae] rounded-full p-3 w-max">
                  <svg
                    className="text-[#8d6e5c] w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#222222] text-xl font-bold">
                    Realistic 2D Renders
                  </h3>
                  <p className="text-gray-600 text-base">
                    Visualize your designs with high-quality, top-down renders
                    that bring your ideas to life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-[#fbf7f4] border-t border-solid border-[#ede8e5]">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4">
              <a className="flex items-center gap-3 text-[#222222]" href="#">
                <h2 className="text-[#222222] text-2xl font-bold tracking-tight">
                  RoomVista
                </h2>
              </a>
              <p className="text-gray-600 text-base">
                Your space, your style, simplified.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 col-span-2 gap-8">
              <div>
                <h4 className="font-bold text-[#222222] mb-4">Product</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      className="text-gray-600 hover:text-[#b58e72] transition-colors"
                      href="#features"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-[#b58e72] transition-colors"
                      href="#"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-[#b58e72] transition-colors"
                      href="#"
                    >
                      Updates
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#222222] mb-4">Company</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      className="text-gray-600 hover:text-[#b58e72] transition-colors"
                      href="#"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-[#b58e72] transition-colors"
                      href="#"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-[#b58e72] transition-colors"
                      href="#"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#222222] mb-4">Legal</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      className="text-gray-600 hover:text-[#b58e72] transition-colors"
                      href="#"
                    >
                      Terms
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-[#b58e72] transition-colors"
                      href="#"
                    >
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-600">
              © 2025 RoomVista. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                className="text-gray-600 hover:text-[#b58e72] transition-colors"
                href="https://www.linkedin.com/in/mansi-verma-213288278"
                target="_blank"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"
                      fill="#0F0F0F"
                    ></path>{" "}
                    <path
                      d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z"
                      fill="#0F0F0F"
                    ></path>{" "}
                    <path
                      d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z"
                      fill="#0F0F0F"
                    ></path>{" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"
                      fill="#0F0F0F"
                    ></path>{" "}
                  </g>
                </svg>
              </a>
              <a
                className="text-gray-600 hover:text-[#b58e72] transition-colors"
                href="https://github.com/Mansiverma30/RoomVista"
                target="_blank"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>github [#142]</title>{" "}
                    <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      {" "}
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-140.000000, -7559.000000)"
                        fill="#000000"
                      >
                        {" "}
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          {" "}
                          <path
                            d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                            id="github-[#142]"
                          >
                            {" "}
                          </path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </a>
              <a
                className="text-gray-600 hover:text-[#b58e72] transition-colors"
                href="https://www.instagram.com/mansiv30/"
                target="_blank"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                      fill="#0F0F0F"
                    ></path>{" "}
                    <path
                      d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                      fill="#0F0F0F"
                    ></path>{" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                      fill="#0F0F0F"
                    ></path>{" "}
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
