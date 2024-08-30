import React from 'react';

const Foot = () => {
    return (
        <footer className="footer">
          <div className="container-foot">
            <div className="row">
              <div className="col-md-4">
                <h5>Quick Links</h5>
                <ul className="foot flex-column">
                  <li><a href="/">Home</a></li>
                  <li><a href="#">About Us</a></li>
                  <li><a href="https://www.linkedin.com">Contact Us</a></li>
                  <li><a href="#">Advertise with Us</a></li>
                </ul>
              </div>
              <div className="col-md-4">
                <h5>Social Media</h5>
                <ul className="foot flex-column">
                  <li><a href="https://x.com/"><img className="footerlink" src="images\footer-links\twitter-logo-2.svg" alt="X logo"/></a></li>
                  <li><a href="https://www.tiktok.com/"><img className="footerlink" src="images\footer-links\tiktok-logo-4500.svg" alt="X logo"/></a></li>
                  <li><a href="https://www.facebook.com/"><img className="footerlink" src="images\footer-links\facebook.svg" alt="X logo"/></a></li>
                  <li><a href="https://www.instagram.com/"><img className="footerlink" src="images\footer-links\instagram-2016-5.svg" alt="X logo"/></a></li>
                </ul>
              </div>
            </div>
            <div className="row-mt-3">
              <div className="col text-center">
                <p>Copyright &copy; SayLess 2024</p>
              </div>
            </div>
          </div>
        </footer>
    );
};

export default Foot;