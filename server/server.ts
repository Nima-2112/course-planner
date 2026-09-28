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

type RequestBody = Record<string, unknown>;

//-------CORS-------
const ALLOWED_ORIGINS = new Set([
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
]);

function getCorsOrigin(request: http.IncomingMessage) {
  const origin = request.headers.origin;

  return origin && ALLOWED_ORIGINS.has(origin)
    ? origin
    : "http://localhost:5173";
}

//-------Database-------
function ensureDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, {
      recursive: true,
    });
  }

  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, "[]", "utf-8");
  }
}

function readUsers(): User[] {
  ensureDatabase();

  try {
    const content = fs.readFileSync(USERS_FILE, "utf-8");

    const parsed = JSON.parse(content) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as User[];
  } catch {
    console.warn("users.json was invalid. Resetting the user database.");

    writeUsers([]);

    return [];
  }
}

function writeUsers(users: User[]) {
  ensureDatabase();

  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

//-------Response Helpers-------
function sendJson(
  request: http.IncomingMessage,
  response: http.ServerResponse,
  statusCode: number,
  data: unknown,
) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",

    "Access-Control-Allow-Origin": getCorsOrigin(request),

    "Access-Control-Allow-Headers": "Content-Type, Authorization",

    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
  });

  response.end(JSON.stringify(data));
}

//-------Request Body-------
function getBody(request: http.IncomingMessage): Promise<RequestBody> {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk: Buffer | string) => {
      body += chunk.toString();

      if (body.length > 1_000_000) {
        reject(new Error("Request body is too large."));

        request.destroy();
      }
    });

    request.on("end", () => {
      try {
        resolve(body ? (JSON.parse(body) as RequestBody) : {});
      } catch {
        reject(new Error("Invalid JSON."));
      }
    });

    request.on("error", reject);
  });
}

//-------Authentication-------
function getTokenFromRequest(request: http.IncomingMessage): string | null {
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice("Bearer ".length);
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

    return readUsers().find((user) => user.id === payload.userId) || null;
  } catch {
    return null;
  }
}

function publicUser(user: User) {
  return {
    id: user.id,
    username: user.username,
  };
}

//-------Server-------
const server = http.createServer(async (request, response) => {
  //-------CORS-------
  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": getCorsOrigin(request),

      "Access-Control-Allow-Headers": "Content-Type, Authorization",

      "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
    });

    response.end();

    return;
  }

  try {
    //-------Health-------
    if (request.method === "GET" && request.url === "/api/health") {
      sendJson(request, response, 200, {
        ok: true,
        message: "Course Planner API is running.",
      });

      return;
    }

    //-------Register-------
    if (request.method === "POST" && request.url === "/api/auth/register") {
      const body = await getBody(request);

      const username = String(body.username || "").trim();

      const password = String(body.password || "");

      if (username.length < 3) {
        sendJson(request, response, 400, {
          message: "Username must be at least 3 characters.",
        });

        return;
      }

      if (password.length < 6) {
        sendJson(request, response, 400, {
          message: "Password must be at least 6 characters.",
        });

        return;
      }

      const users = readUsers();

      const existing = users.find(
        (user) => user.username.toLowerCase() === username.toLowerCase(),
      );

      if (existing) {
        sendJson(request, response, 409, {
          message: "Username already exists.",
        });

        return;
      }

      const user: User = {
        id: Date.now(),

        username,

        passwordHash: await bcrypt.hash(password, 10),

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

      sendJson(request, response, 201, {
        token,

        user: publicUser(user),
      });

      return;
    }

    //-------Login-------
    if (request.method === "POST" && request.url === "/api/auth/login") {
      const body = await getBody(request);

      const username = String(body.username || "").trim();

      const password = String(body.password || "");

      const user = readUsers().find(
        (item) => item.username.toLowerCase() === username.toLowerCase(),
      );

      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        sendJson(request, response, 401, {
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

      sendJson(request, response, 200, {
        token,

        user: publicUser(user),
      });

      return;
    }

    //-------Current User-------
    if (request.method === "GET" && request.url === "/api/auth/me") {
      const user = getAuthenticatedUser(request);

      if (!user) {
        sendJson(request, response, 401, {
          message: "Authentication required.",
        });

        return;
      }

      sendJson(request, response, 200, {
        user: publicUser(user),
      });

      return;
    }

    //-------Get Planner-------
    if (request.method === "GET" && request.url === "/api/planner") {
      const user = getAuthenticatedUser(request);

      if (!user) {
        sendJson(request, response, 401, {
          message: "Authentication required.",
        });

        return;
      }

      sendJson(request, response, 200, {
        planner: user.planner,
      });

      return;
    }

    //-------Save Planner-------
    if (request.method === "PUT" && request.url === "/api/planner") {
      const user = getAuthenticatedUser(request);

      if (!user) {
        sendJson(request, response, 401, {
          message: "Authentication required.",
        });

        return;
      }

      const body = await getBody(request);

      const planner = Array.isArray(body.planner)
        ? [...new Set(body.planner.map(Number).filter(Number.isFinite))]
        : [];

      const users = readUsers();

      const index = users.findIndex((item) => item.id === user.id);

      if (index === -1) {
        sendJson(request, response, 404, {
          message: "User not found.",
        });

        return;
      }

      users[index].planner = planner;

      writeUsers(users);

      sendJson(request, response, 200, {
        message: "Planner saved successfully.",

        planner,
      });

      return;
    }

    //-------Not Found-------
    sendJson(request, response, 404, {
      message: "API endpoint not found.",
    });
  } catch (error) {
    console.error("Server error:", error);

    sendJson(request, response, 500, {
      message: "Internal server error.",
    });
  }
});

//-------Start Server-------
ensureDatabase();

server.listen(PORT, () => {
  console.log(`Course Planner API running on http://localhost:${PORT}`);

  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
