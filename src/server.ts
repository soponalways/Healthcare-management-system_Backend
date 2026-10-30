// Start the server

import app from "./app";
import { envVars } from "./config/env";
import https from "https";
import fs from "fs";
import path from "path";

const bootstrap = () => {
  try {
    const keyFile = "sopon.dev-key.pem";
    const certFile = "sopon.dev.pem";

    console.log(process.cwd());

    const httpsOptions = {
      key: fs.readFileSync(path.join(process.cwd(), keyFile)),
      cert: fs.readFileSync(path.join(process.cwd(), certFile)),
    };

    if (envVars.PROTOCOL === "https") {
      https
        .createServer(httpsOptions, app)
        .listen(Number(envVars.PORT), "0.0.0.0", () => {
          console.log(
            `Secure Server running at https://sopon.dev:${envVars.PORT}`,
          );
        });
    } else if (envVars.PROTOCOL === "http") {
      app.listen(envVars.PORT, () => {
        console.log(`Server is running on http://sopon.com:${envVars.PORT}`);
      });
    }
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

bootstrap();
