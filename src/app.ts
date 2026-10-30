import express, { Application, NextFunction, Request, Response } from "express";
import { prisma } from "./app/lib/prisma";
import IndexRoutes from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";

const app: Application = express();

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes

app.use("/api/v1/", IndexRoutes);

// Basic route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>Healthcare Management System</title>

      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #e0f7fa, #e8eaf6, #fce4ec);
          color: #263238;
        }

        .container {
          width: 100%;
          max-width: 650px;
          padding: 45px 30px;
          text-align: center;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 24px;
          box-shadow: 0 15px 45px rgba(40, 60, 90, 0.12);
          animation: fadeIn 1s ease;
        }

        .icon {
          font-size: 55px;
          margin-bottom: 20px;
        }

        h1 {
          font-size: clamp(26px, 5vw, 36px);
          color: #00796b;
          margin-bottom: 16px;
        }

        .description {
          font-size: 16px;
          line-height: 1.8;
          color: #546e7a;
          margin-bottom: 25px;
        }

        .status {
          display: inline-block;
          padding: 10px 18px;
          border-radius: 30px;
          background: #e0f2f1;
          color: #00796b;
          font-size: 14px;
          font-weight: bold;
        }

        .divider {
          height: 1px;
          background: #e0e0e0;
          margin: 30px 0;
        }

        .love-title {
          color: #78909c;
          font-size: 14px;
          margin-bottom: 12px;
        }

        .names {
          font-size: clamp(27px, 6vw, 38px);
          font-weight: bold;
          color: #e91e63;
          letter-spacing: 1px;
        }

        .heart {
          display: inline-block;
          color: #ff1744;
          margin: 0 5px;
          animation: heartbeat 1s infinite;
        }

        .footer {
          margin-top: 28px;
          font-size: 12px;
          color: #90a4ae;
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          15% {
            transform: scale(1.35);
          }
          30% {
            transform: scale(1);
          }
          45% {
            transform: scale(1.2);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 35px 20px;
          }

          .description {
            font-size: 14px;
          }
        }


/* Additional Sections */

.features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-top: 25px;
  text-align: left;
}

.feature-card {
  padding: 18px 12px;
  border-radius: 15px;
  background: #f5fbfb;
  border: 1px solid #e0f2f1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 121, 107, 0.12);
}

.feature-card .emoji {
  font-size: 27px;
  margin-bottom: 10px;
}

.feature-card h3 {
  color: #00796b;
  font-size: 15px;
  margin-bottom: 7px;
}

.feature-card p {
  color: #78909c;
  font-size: 12px;
  line-height: 1.6;
}

.section-title {
  margin-top: 30px;
  margin-bottom: 15px;
  color: #37474f;
  font-size: 19px;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 9px;
}

.tech {
  padding: 9px 14px;
  border-radius: 20px;
  background: #e8eaf6;
  color: #3949ab;
  font-size: 12px;
  font-weight: bold;
}

.message {
  margin-top: 25px;
  padding: 20px 15px;
  border-radius: 16px;
  background: linear-gradient(135deg, #fff0f5, #fce4ec);
}

.message h3 {
  color: #c2185b;
  margin-bottom: 10px;
}

.message p {
  color: #880e4f;
  font-size: 14px;
  line-height: 1.8;
}

.love-animation {
  display: inline-block;
  margin-top: 12px;
  font-size: 28px;
  animation: floatHeart 2s ease-in-out infinite;
}

@keyframes floatHeart {
  0%, 100% {
    transform: translateY(0) rotate(-5deg);
  }
  50% {
    transform: translateY(-8px) rotate(5deg);
  }
}

@media (max-width: 420px) {
  .features {
    grid-template-columns: 1fr;
  }
}

      </style>
    </head>

    <body>
      <main class="container">
        <div class="icon">🏥</div>

        <h1>Healthcare Management System</h1>

        <p class="description">
          Welcome to our Healthcare Management System.
          This system is designed to simplify healthcare management
          by organizing patient information, managing appointments,
          maintaining medical records, and improving healthcare services
          through a secure and efficient digital platform.
        </p>

        <div class="status">
          ● Backend Server is Running
        </div>

        <div class="divider"></div>

        <p class="love-title">Made with love by</p>

        <div class="names">
          Sopon <span class="heart">♥</span> Rokeya
        </div>


<!-- Healthcare Features -->
<h2 class="section-title">✨ Our System Features</h2>

<div class="features">
  <div class="feature-card">
    <div class="emoji">👨‍⚕️</div>
    <h3>Doctor Management</h3>
    <p>Manage doctor profiles and healthcare professionals.</p>
  </div>

  <div class="feature-card">
    <div class="emoji">🧑‍🤝‍🧑</div>
    <h3>Patient Management</h3>
    <p>Organize patient information and medical records.</p>
  </div>

  <div class="feature-card">
    <div class="emoji">📅</div>
    <h3>Appointments</h3>
    <p>Keep appointments organized and easy to manage.</p>
  </div>

  <div class="feature-card">
    <div class="emoji">💊</div>
    <h3>Medical Records</h3>
    <p>Support efficient access to healthcare information.</p>
  </div>
</div>


<!-- Modern Technology Stack -->
<h2 class="section-title">⚡ Modern Tech Stack</h2>

<p class="tech-description">
  Built with modern technologies for scalable,
  secure and high-performance applications.
</p>

<div class="tech-stack modern-stack">

  <span class="tech tech-frontend">⚛️ Next.js</span>
  <span class="tech tech-language">🔷 TypeScript</span>
  <span class="tech tech-database">💎 Prisma ORM</span>
  <span class="tech tech-database">🐘 PostgreSQL</span>
  <span class="tech tech-state">🔄 Redux Toolkit</span>
  <span class="tech tech-backend">🚀 Express.js</span>
  <span class="tech tech-backend">🟢 Node.js</span>
  <span class="tech tech-devops">🐳 Docker</span>
  <span class="tech tech-devops">🌐 Nginx</span>
  <span class="tech tech-frontend">🎨 Tailwind CSS</span>
  <span class="tech tech-tools">🔐 REST API</span>
  <span class="tech tech-tools">🛡️ Secure Architecture</span>
  <span class="tech tech-tools">📱 Responsive UI</span>
  <span class="tech tech-tools">✨ Modern UI/UX</span>
  <span class="tech tech-tools">⚙️ Scalable Backend</span>

</div>

<!-- Developer Message -->
<div class="message">
  <h3>💌 A Little Message</h3>

  <p>
    Great software is built with passion, dedication,
    and a vision to make life better.
    This Healthcare Management System is a step toward
    smarter and more organized healthcare services.
  </p>

  <div class="love-animation">💗 💖 💗</div>

  <p style="margin-top: 10px; font-weight: bold;">
    Specially dedicated to Sopon + Rokeya ❤️
  </p>
</div>


        <p class="footer">
          &copy; <span id="year"></span> Healthcare Management System
          | All rights reserved.
        </p>
      </main>

      <script>
        document.getElementById("year").textContent =
          new Date().getFullYear();
      </script>
    </body>
    </html>
  `);
});


app.use(globalErrorHandler); 

app.use(notFound)

export default app;
