import React from "react";
import { Link } from "react-router-dom";
 
function Footer() {
  return (
    <>
      <footer className="bg-primary text-white text-center text-lg-start mt-5">
        {/* <div className="container p-4">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase">Footer Content</h5>
 
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                atque ea quis molestias. Fugiat pariatur maxime quis culpa
                corporis vitae repudiandae aliquam voluptatem veniam, est atque
                cumque eum delectus sint!
              </p>
            </div>
 
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h4 className="text-uppercase">Links</h4>
 
              <ul className="list-unstyled mb-0">
                <li>
                  <Link to={""} className="text-white">
                    Link 1
                  </Link>
                </li>
                <li>
                  <Link to={""} className="text-white">
                    Link 1
                  </Link>
                </li>
                <li>
                  <Link to={""} className="text-white">
                    Link 1
                  </Link>
                </li>
                <li>
                  <Link to={""} className="text-white">
                    Link 1
                  </Link>
                </li>
              </ul>
            </div>
 
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h4 className="text-uppercase mb-0">Links</h4>
 
              <ul className="list-unstyled">
                <li>
                  <Link to={""} className="text-white">
                    Link 1
                  </Link>
                </li>
                <li>
                  <Link to={""} className="text-white">
                    Link 1
                  </Link>
                </li>
                <li>
                  <Link to={""} className="text-white">
                    Link 1
                  </Link>
                </li>
                <li>
                  <Link to={""} className="text-white">
                    Link 1
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
 
        <div
          className="text-center p-3"
          style={{backgroundColor:'rgba(0, 0, 0, 0.2)'}}
        >
         
          <a class="text-white" >
          © 2022   - Thực tập công ty Brycen
          </a>
        </div>
      </footer>
    </>
  );
}
export default Footer;
 