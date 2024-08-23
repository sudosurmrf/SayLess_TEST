import React from 'react';

const Foot = () => {
    return (
        <footer className="footer">
          <div className="container-foot">
            <div className="row">
              <div className="col-md-4">
                <h5>Quick Links</h5>
                <ul className="foot flex-column">
                  <li><a href="#">Home</a></li>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">Advertise with Us</a></li>
                </ul>
              </div>
              <div className="col-md-4">
                <h5>Social Media</h5>
                <ul className="foot flex-column">
                  <li><a href="#">X</a></li>
                  <li><a href="#">Tik Tok</a></li>
                  <li><a href="#">Facebook</a></li>
                  <li><a href="#">Instagram</a></li>
                  
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