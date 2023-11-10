import { Container } from "react-bootstrap";
import "../css/Dashboard.css";
import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <div>
      <Container className="hero-banner">
        <h1>Welcome to Our React App</h1>
        <p>Supercharge your experience with our amazing app.</p>
        <Link to="/fireStoreData">
          <button>Get Started</button>
        </Link>
        <br />
        <br />
        <div className="features">
          <h2>Features</h2>
          <div className="feature-list">
            <div className="feature-item">
              <h3>Feature 1</h3>
              <p>Description of feature 1 goes here.</p>
            </div>
            <div className="feature-item">
              <h3>Feature 2</h3>
              <p>Description of feature 2 goes here.</p>
            </div>
            <div className="feature-item">
              <h3>Feature 3</h3>
              <p>Description of feature 3 goes here.</p>
            </div>
            {/* Add more features as needed */}
          </div>
        </div>
        <br />
        <br />
        <div className="testimonials">
          <h2>Testimonials</h2>
          <div className="testimonial-list">
            <div className="testimonial-item">
              <p>
                Great app! It has completely changed how I work. Highly
                recommended!
              </p>
              <p>- John Doe</p>
            </div>
            <div className="testimonial-item">
              <p>
                I love the features and the ease of use. Best app Ive used so
                far.
              </p>
              <p>- Jane Smith</p>
            </div>
            {/* Add more testimonials as needed */}
          </div>
        </div>
        <br />
        <br />
        <div className="call-to-action">
          <h2>Ready to get started?</h2>
          <p>Join us today and unlock a world of possibilities!</p>
          <Link to="/loginAuth">
            <button>Log in</button>
          </Link>
        </div>
        <br />
        <br />{" "}
        <div className="services-section">
          <h2>Our Services</h2>
          <div className="service-list">
            <div className="service-item">
              <h3>Service 1</h3>
              <p>Description of service 1 goes here.</p>
            </div>
            <div className="service-item">
              <h3>Service 2</h3>
              <p>Description of service 2 goes here.</p>
            </div>
            <div className="service-item">
              <h3>Service 3</h3>
              <p>Description of service 3 goes here.</p>
            </div>
            {/* Add more services as needed */}
          </div>
        </div>
        <br />
        <br />{" "}
        <div className="about-section">
          <h2>About Us</h2>
          <p>Welcome to our app! We strive to revolutionize...</p>
          <p>Our mission is to...</p>
          <p>With our app, you can...</p>
        </div>
      </Container>
      <footer className="footer">
        <div className="footer-content">
          <p>© 2023 Your App. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
