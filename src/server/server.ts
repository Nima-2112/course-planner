//-------import-------
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//-------Constants-------
const PORT = 5000;

const JWT_SECRET =
  process.env.JWT_SECRET || "course-planner-development-secret";

//-------File Paths-------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

//-------Types-------
type User = {
  id: number;
  username: string;
  passwordHash: string;
  planner: number[];
};

//-------Database Helpers-------
function ensureDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, "[]", "utf-8");
  }
}

function readUsers(): User[] {
  ensureDatabase();

  const data = fs.readFileSync(USERS_FILE, "utf-8");

  try {
    return JSON.parse(data) as User[];
  } catch {
    console.error("users.json contains invalid JSON.");

    return [];
  }
}

function writeUsers(users: User[]) {
  ensureDatabase();

  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

//-------Request Helpers-------
function sendJson(
  response: http.ServerResponse,
  statusCode: number,
  data: unknown,
) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "http://localhost:5175",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
  });

  response.end(JSON.stringify(data));
}

function getBody(
  request: http.IncomingMessage,
): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });

    request.on("error", reject);
  });
}

//-------Authentication-------
function getTokenFromRequest(request: http.IncomingMessage): string | null {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return null;
  }

  if (!authorization.startsWith("Bearer ")) {
    return null;
  }

  return authorization.substring("Bearer ".length);
}

function getAuthenticatedUser(request: http.IncomingMessage): User | null {
  const token = getTokenFromRequest(request);

  if (!token) {
    return null;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      userId: number;
    };

    const users = readUsers();

    return users.find((user) => user.id === payload.userId) || null;
  } catch {
    return null;
  }
}

//-------Server-------
const server = http.createServer(
  async (request: http.IncomingMessage, response: http.ServerResponse) => {
    //-------CORS Preflight-------
    if (request.method === "OPTIONS") {
      response.writeHead(204, {
        "Access-Control-Allow-Origin": "http://localhost:5175",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
      });

      response.end();

      return;
    }

    try {
      //-------Health Check-------
      if (request.method === "GET" && request.url === "/api/health") {
        sendJson(response, 200, {
          message: "Course Planner API is running.",
        });

        return;
      }

      //-------Register-------
      if (request.method === "POST" && request.url === "/api/auth/register") {
        const body = await getBody(request);

        const username = String(body.username || "").trim();
        const password = String(body.password || "");

        if (!username || !password) {
          sendJson(response, 400, {
            message: "Username and password are required.",
          });

          return;
        }

        if (username.length < 3) {
          sendJson(response, 400, {
            message: "Username must be at least 3 characters.",
          });

          return;
        }

        if (password.length < 6) {
          sendJson(response, 400, {
            message: "Password must be at least 6 characters.",
          });

          return;
        }

        const users = readUsers();

        const existingUser = users.find(
          (user) => user.username.toLowerCase() === username.toLowerCase(),
        );

        if (existingUser) {
          sendJson(response, 409, {
            message: "Username already exists.",
          });

          return;
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user: User = {
          id: Date.now(),
          username,
          passwordHash,
          planner: [],
        };

        users.push(user);

        writeUsers(users);

        const token = jwt.sign(
          {
            userId: user.id,
          },
          JWT_SECRET,
          {
            expiresIn: "7d",
          },
        );

        sendJson(response, 201, {
          token,
          user: {
            id: user.id,
            username: user.username,
          },
        });

        return;
      }

      //-------Login-------
      if (request.method === "POST" && request.url === "/api/auth/login") {
        const body = await getBody(request);

        const username = String(body.username || "").trim();
        const password = String(body.password || "");

        if (!username || !password) {
          sendJson(response, 400, {
            message: "Username and password are required.",
          });

          return;
        }

        const users = readUsers();

        const user = users.find(
          (item) => item.username.toLowerCase() === username.toLowerCase(),
        );

        if (!user) {
          sendJson(response, 401, {
            message: "Invalid username or password.",
          });

          return;
        }

        const passwordIsValid = await bcrypt.compare(
          password,
          user.passwordHash,
        );

        if (!passwordIsValid) {
          sendJson(response, 401, {
            message: "Invalid username or password.",
          });

          return;
        }

        const token = jwt.sign(
          {
            userId: user.id,
          },
          JWT_SECRET,
          {
            expiresIn: "7d",
          },
        );

        sendJson(response, 200, {
          token,
          user: {
            id: user.id,
            username: user.username,
          },
        });

        return;
      }

      //-------Get Planner-------
      if (request.method === "GET" && request.url === "/api/planner") {
        const user = getAuthenticatedUser(request);

        if (!user) {
          sendJson(response, 401, {
            message: "Authentication required.",
          });

          return;
        }

        sendJson(response, 200, {
          planner: user.planner,
        });

        return;
      }

      //-------Save Planner-------
      if (request.method === "PUT" && request.url === "/api/planner") {
        const user = getAuthenticatedUser(request);

        if (!user) {
          sendJson(response, 401, {
            message: "Authentication required.",
          });

          return;
        }

        const body = await getBody(request);

        const planner = Array.isArray(body.planner)
          ? body.planner.map(Number).filter((id) => Number.isFinite(id))
          : [];

        const uniquePlanner = [...new Set(planner)];

        const users = readUsers();

        const userIndex = users.findIndex((item) => item.id === user.id);

        if (userIndex === -1) {
          sendJson(response, 404, {
            message: "User not found.",
          });

          return;
        }

        users[userIndex].planner = uniquePlanner;

        writeUsers(users);

        sendJson(response, 200, {
          message: "Planner saved successfully.",
          planner: uniquePlanner,
        });

        return;
      }

      //-------Not Found-------
      sendJson(response, 404, {
        message: "API endpoint not found.",
      });
    } catch (error) {
      console.error("Server error:", error);

      sendJson(response, 500, {
        message: "Internal server error.",
      });
    }
  },
);

//-------Start Server-------
ensureDatabase();

server.listen(PORT, () => {
  console.log(`Course Planner API running on http://localhost:${PORT}`);
});
