# CodeArena System Architecture & Database Design Diagrams

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER (Frontend)                           │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    Next.js Web Application                           │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │  │
│  │  │   Homepage   │  │  Play Page   │  │ Leaderboard  │              │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │  │
│  │  │   Profile    │  │   Mentor     │  │   About      │              │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │  │
│  │                                                                      │  │
│  │  Components:                                                        │  │
│  │  • Monaco Editor (Code Editor)                                      │  │
│  │  • Three.js (3D Visualizations)                                     │  │
│  │  • React Components                                                 │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Port: 3000 (HTTP)                                                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTP/REST API
                                    │ (JSON)
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        APPLICATION LAYER (Backend)                          │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    Express.js API Server                             │  │
│  │  Port: 3001 (HTTP)                                                   │  │
│  │                                                                      │  │
│  │  ┌──────────────────────────────────────────────────────────────┐  │  │
│  │  │                    Routes Layer                                │  │  │
│  │  │  /auth          /challenges    /submissions                   │  │  │
│  │  │  /profile       /stats         /mentor        /run            │  │  │
│  │  └──────────────────────────────────────────────────────────────┘  │  │
│  │                              │                                       │  │
│  │  ┌──────────────────────────────────────────────────────────────┐  │  │
│  │  │                  Controllers Layer                              │  │  │
│  │  │  • authController      • challengeController                  │  │  │
│  │  │  • submissionController • statsController                     │  │  │
│  │  │  • mentorController    • profileController                    │  │  │
│  │  └──────────────────────────────────────────────────────────────┘  │  │
│  │                              │                                       │  │
│  │  ┌──────────────────────────────────────────────────────────────┐  │  │
│  │  │                    Services Layer                               │  │  │
│  │  │  • executionService (Docker code execution)                    │  │  │
│  │  │  • AI integration services                                     │  │  │
│  │  └──────────────────────────────────────────────────────────────┘  │  │
│  │                              │                                       │  │
│  │  ┌──────────────────────────────────────────────────────────────┐  │  │
│  │  │                  Middleware Layer                               │  │  │
│  │  │  • Authentication (JWT)     • Authorization                  │  │  │
│  │  │  • Input Validation          • Error Handling                 │  │  │
│  │  └──────────────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│   DATA LAYER            │  │   EXTERNAL SERVICES     │  │   EXECUTION LAYER       │
│                         │  │                         │  │                         │
│  ┌───────────────────┐  │  │  ┌───────────────────┐  │  │  ┌───────────────────┐  │
│  │   PostgreSQL      │  │  │  │  Google Gemini AI  │  │  │  │  Docker Engine    │  │
│  │   Database        │  │  │  │  (via OpenRouter)  │  │  │  │                    │  │
│  │                   │  │  │  │                    │  │  │  │  Code Execution   │  │
│  │  • Users          │  │  │  │  Challenge Gen     │  │  │  │  Containers       │  │
│  │  • Challenges     │  │  │  └───────────────────┘  │  │  │  • Isolated Env    │  │
│  │  • Submissions    │  │  │                         │  │  │  • Resource Limits │  │
│  │                   │  │  │  ┌───────────────────┐  │  │  │  • Time Limits     │  │
│  │  Port: 5433       │  │  │  │   Groq API        │  │  │  └───────────────────┘  │
│  │  (Sequelize ORM)  │  │  │  │                    │  │  │                         │
│  └───────────────────┘  │  │  │  AI Assistance     │  │  │  Port: Docker Socket   │
│                         │  │  │  Mentor Chat       │  │  │                         │
│                         │  │  └───────────────────┘  │  │                         │
└─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘
```

## Detailed System Architecture

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                              USER INTERFACE                                   │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Browser    │  │   Browser    │  │   Browser    │  │   Browser    │    │
│  │  (Desktop)   │  │  (Mobile)    │  │  (Tablet)    │  │  (CLI Tool)  │    │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘    │
│         │                 │                  │                  │            │
│         └─────────────────┴──────────────────┴─────────────────┘            │
│                              │                                                │
│                              │ HTTPS                                          │
└──────────────────────────────┼────────────────────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                         FRONTEND SERVER (Next.js)                             │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  Next.js Application (Port 3000)                                   │     │
│  │                                                                    │     │
│  │  • Server-Side Rendering (SSR)                                     │     │
│  │  • Static Site Generation (SSG)                                    │     │
│  │  • API Routes                                                      │     │
│  │  • React Components                                                │     │
│  │  • Monaco Editor Integration                                       │     │
│  │  • Three.js 3D Graphics                                            │     │
│  └────────────────────────────────────────────────────────────────────┘     │
└──────────────────────────────┬────────────────────────────────────────────────┘
                               │
                               │ REST API Calls
                               │ (JSON)
                               ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                        BACKEND API SERVER (Express)                           │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  Express.js Server (Port 3001)                                     │     │
│  │                                                                    │     │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │     │
│  │  │   Routes     │  │  Middleware  │  │ Controllers  │           │     │
│  │  │              │  │              │  │              │           │     │
│  │  │ • /auth      │  │ • Auth JWT   │  │ • Auth       │           │     │
│  │  │ • /challenges│  │ • Validation │  │ • Challenge  │           │     │
│  │  │ • /submissions│ │ • CORS       │  │ • Submission │           │     │
│  │  │ • /stats     │  │ • Error      │  │ • Stats      │           │     │
│  │  │ • /mentor    │  │   Handling   │  │ • Mentor     │           │     │
│  │  │ • /profile   │  │              │  │ • Profile    │           │     │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘           │     │
│  │         │                 │                  │                     │     │
│  │         └─────────────────┴──────────────────┘                     │     │
│  │                              │                                      │     │
│  │                              ▼                                      │     │
│  │  ┌────────────────────────────────────────────────────────────┐    │     │
│  │  │                    Services Layer                           │    │     │
│  │  │  • executionService - Docker code execution                │    │     │
│  │  │  • AI Service - Challenge generation & assistance          │    │     │
│  │  └────────────────────────────────────────────────────────────┘    │     │
│  └────────────────────────────────────────────────────────────────────┘     │
└──────────────────────────────┬────────────────────────────────────────────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│   PostgreSQL DB      │  │   External AI APIs   │  │   Docker Engine      │
│                      │  │                      │  │                      │
│  • User Data         │  │  • Google Gemini     │  │  • Code Execution    │
│  • Challenges       │  │    (OpenRouter)       │  │  • Sandboxed Env     │
│  • Submissions      │  │  • Groq API           │  │  • Resource Control  │
│  • Statistics       │  │    (Llama 3.1)        │  │  • Time Limits       │
│                      │  │                      │  │                      │
│  Port: 5433         │  │  HTTPS API Calls      │  │  Docker Socket       │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
```

## Data Flow Diagram

```
┌──────────┐
│   User   │
└────┬─────┘
     │
     │ 1. Request Challenge
     ▼
┌─────────────────┐
│  Frontend       │
│  (Next.js)      │
└────┬────────────┘
     │
     │ 2. POST /challenges/generate
     ▼
┌─────────────────┐
│  Backend API    │
│  (Express)      │
└────┬────────────┘
     │
     │ 3. Call AI Service
     ▼
┌─────────────────┐         ┌──────────────┐
│  Google Gemini  │◄────────│  OpenRouter │
│  (AI)           │         │    API      │
└────┬────────────┘         └──────────────┘
     │
     │ 4. Generated Challenge
     ▼
┌─────────────────┐
│  Backend API    │
└────┬────────────┘
     │
     │ 5. Save to Database
     ▼
┌─────────────────┐
│  PostgreSQL     │
│  (Challenges)   │
└────┬────────────┘
     │
     │ 6. Return Challenge
     ▼
┌─────────────────┐
│  Frontend       │
└────┬────────────┘
     │
     │ 7. Display to User
     ▼
┌──────────┐
│   User   │
└──────────┘

─────────────────────────────────────────────────────

┌──────────┐
│   User   │
└────┬─────┘
     │
     │ 1. Click "AI Help"
     ▼
┌─────────────────┐
│  Frontend       │
└────┬────────────┘
     │
     │ 2. POST /challenges/assistance
     │    {challengeId, userCode, language}
     ▼
┌─────────────────┐
│  Backend API    │
└────┬────────────┘
     │
     │ 3. Fetch Challenge from DB
     ▼
┌─────────────────┐
│  PostgreSQL     │
└────┬────────────┘
     │
     │ 4. Call Groq AI
     ▼
┌─────────────────┐
│  Groq API       │
│  (Llama 3.1)    │
└────┬────────────┘
     │
     │ 5. AI Analysis & Response
     │    {topics, videos, hints, learningPath}
     ▼
┌─────────────────┐
│  Backend API    │
└────┬────────────┘
     │
     │ 6. Return Assistance Data
     ▼
┌─────────────────┐
│  Frontend       │
└────┬────────────┘
     │
     │ 7. Display AI Help Panel
     ▼
┌──────────┐
│   User   │
└──────────┘

─────────────────────────────────────────────────────

┌──────────┐
│   User   │
└────┬─────┘
     │
     │ 1. Submit Code
     ▼
┌─────────────────┐
│  Frontend       │
└────┬────────────┘
     │
     │ 2. POST /submissions
     │    {challengeId, code, language}
     ▼
┌─────────────────┐
│  Backend API    │
└────┬────────────┘
     │
     │ 3. Execute in Docker
     ▼
┌─────────────────┐
│  Docker Engine  │
│  (Isolated)     │
└────┬────────────┘
     │
     │ 4. Test Results
     ▼
┌─────────────────┐
│  Backend API    │
└────┬────────────┘
     │
     │ 5. Save Submission & Update XP
     ▼
┌─────────────────┐
│  PostgreSQL     │
│  (Submissions,  │
│   Users)        │
└────┬────────────┘
     │
     │ 6. Return Results
     ▼
┌─────────────────┐
│  Frontend       │
└────┬────────────┘
     │
     │ 7. Display Results
     ▼
┌──────────┐
│   User   │
└──────────┘
```

---

## Database Design Diagram

### Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DATABASE SCHEMA                                   │
│                         (PostgreSQL Database)                               │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER TABLE                                      │
│                                                                             │
│  ┌─────────────────┐                                                        │
│  │ id (PK)         │  INTEGER, PRIMARY KEY, AUTO_INCREMENT                 │
│  │ username        │  VARCHAR(50), UNIQUE, NOT NULL                        │
│  │ email           │  VARCHAR(100), UNIQUE, NOT NULL                      │
│  │ password        │  VARCHAR(255), NULLABLE (for OAuth users)             │
│  │ googleId        │  VARCHAR(100), NULLABLE, UNIQUE                       │
│  │ githubId        │  VARCHAR(100), NULLABLE, UNIQUE                       │
│  │ provider        │  VARCHAR(20), DEFAULT 'local'                         │
│  │ xp              │  INTEGER, DEFAULT 0                                  │
│  │ level           │  INTEGER, DEFAULT 1                                  │
│  │ createdAt       │  TIMESTAMP, DEFAULT NOW()                            │
│  │ updatedAt       │  TIMESTAMP, DEFAULT NOW()                             │
│  └─────────────────┘                                                        │
│                                                                             │
│  Indexes:                                                                   │
│  • PRIMARY KEY (id)                                                         │
│  • UNIQUE (username)                                                        │
│  • UNIQUE (email)                                                           │
│  • UNIQUE (googleId)                                                        │
│  • UNIQUE (githubId)                                                        │
│  • INDEX (xp) - for leaderboard queries                                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ 1:N
                                    │ (One User has Many Submissions)
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SUBMISSION TABLE                                   │
│                                                                             │
│  ┌─────────────────┐                                                        │
│  │ id (PK)         │  INTEGER, PRIMARY KEY, AUTO_INCREMENT                 │
│  │ userId (FK)     │  INTEGER, NOT NULL, REFERENCES users(id)             │
│  │ challengeId(FK) │  INTEGER, NOT NULL, REFERENCES challenges(id)         │
│  │ code            │  TEXT, NOT NULL                                      │
│  │ language        │  VARCHAR(20), NOT NULL                               │
│  │ status          │  VARCHAR(20), DEFAULT 'pending'                       │
│  │                 │  VALUES: 'passed', 'failed', 'error', 'pending'      │
│  │ output          │  TEXT, NULLABLE                                       │
│  │ executionTime   │  INTEGER, NULLABLE (milliseconds)                     │
│  │ createdAt       │  TIMESTAMP, DEFAULT NOW()                             │
│  │ updatedAt       │  TIMESTAMP, DEFAULT NOW()                             │
│  └─────────────────┘                                                        │
│                                                                             │
│  Indexes:                                                                   │
│  • PRIMARY KEY (id)                                                         │
│  • FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE             │
│  • FOREIGN KEY (challengeId) REFERENCES challenges(id) ON DELETE CASCADE   │
│  • INDEX (userId) - for user submission history                           │
│  • INDEX (challengeId) - for challenge statistics                          │
│  • INDEX (status) - for filtering submissions                              │
│  • INDEX (createdAt) - for recent submissions                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ▲
                                    │
                                    │ N:1
                                    │ (Many Submissions belong to One Challenge)
                                    │
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CHALLENGE TABLE                                    │
│                                                                             │
│  ┌─────────────────┐                                                        │
│  │ id (PK)         │  INTEGER, PRIMARY KEY, AUTO_INCREMENT                 │
│  │ title           │  VARCHAR(200), NOT NULL                              │
│  │ description     │  TEXT, NOT NULL                                       │
│  │ difficulty      │  VARCHAR(20), NOT NULL                               │
│  │                 │  VALUES: 'easy', 'medium', 'hard'                    │
│  │ language        │  VARCHAR(20), NOT NULL                               │
│  │                 │  VALUES: 'javascript', 'java'                       │
│  │ template        │  TEXT, NOT NULL (starter code)                        │
│  │ testCases       │  JSONB, NOT NULL (array of test cases)                │
│  │                 │  Format: [                                            │
│  │                 │    {input: "...", output: "..."},                     │
│  │                 │    {input: "...", output: "..."}                      │
│  │                 │  ]                                                    │
│  │ createdByAI     │  BOOLEAN, DEFAULT true                                │
│  │ createdAt       │  TIMESTAMP, DEFAULT NOW()                             │
│  │ updatedAt       │  TIMESTAMP, DEFAULT NOW()                             │
│  └─────────────────┘                                                        │
│                                                                             │
│  Indexes:                                                                   │
│  • PRIMARY KEY (id)                                                         │
│  • INDEX (difficulty) - for filtering by difficulty                        │
│  │ INDEX (language) - for filtering by language                            │
│  • INDEX (createdAt) - for recent challenges                               │
│  • INDEX (createdByAI) - for AI-generated challenges                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Database Relationships

```
┌─────────────┐                    ┌──────────────┐                    ┌─────────────┐
│    USER     │                    │  SUBMISSION  │                    │  CHALLENGE  │
│             │                    │              │                    │             │
│  id (PK)    │◄───────────────────│  userId (FK) │                    │  id (PK)    │
│  username   │    1:N             │  challengeId │◄──────────────────│  title      │
│  email      │    (One User       │    (FK)      │     N:1            │  description│
│  password   │     has Many       │  code        │    (Many           │  difficulty │
│  googleId   │     Submissions)   │  language    │     Submissions    │  language   │
│  githubId   │                    │  status      │     belong to      │  template   │
│  provider   │                    │  output      │     One Challenge) │  testCases  │
│  xp         │                    │  createdAt    │                    │  createdAt  │
│  level      │                    │              │                    │             │
│  createdAt  │                    │              │                    │             │
└─────────────┘                    └──────────────┘                    └─────────────┘
```

### Detailed Table Schemas

#### Users Table
```
┌──────────────────┬──────────────┬─────────────┬─────────────────────────────┐
│ Column Name      │ Data Type   │ Constraints │ Description                 │
├──────────────────┼──────────────┼─────────────┼─────────────────────────────┤
│ id               │ INTEGER     │ PK, AI      │ Unique user identifier      │
│ username         │ VARCHAR(50) │ UNIQUE, NN  │ User's display name         │
│ email            │ VARCHAR(100)│ UNIQUE, NN  │ User's email address         │
│ password         │ VARCHAR(255)│ NULLABLE    │ Hashed password (bcrypt)     │
│ googleId         │ VARCHAR(100)│ UNIQUE, NULL│ Google OAuth ID             │
│ githubId         │ VARCHAR(100)│ UNIQUE, NULL │ GitHub OAuth ID             │
│ provider         │ VARCHAR(20) │ DEFAULT     │ 'local', 'google', 'github' │
│ xp               │ INTEGER     │ DEFAULT 0   │ Experience points           │
│ level            │ INTEGER     │ DEFAULT 1   │ User level                   │
│ createdAt        │ TIMESTAMP   │ DEFAULT NOW │ Account creation time        │
│ updatedAt        │ TIMESTAMP   │ DEFAULT NOW │ Last update time             │
└──────────────────┴──────────────┴─────────────┴─────────────────────────────┘
```

#### Challenges Table
```
┌──────────────────┬──────────────┬─────────────┬─────────────────────────────┐
│ Column Name      │ Data Type   │ Constraints │ Description                 │
├──────────────────┼──────────────┼─────────────┼─────────────────────────────┤
│ id               │ INTEGER     │ PK, AI      │ Unique challenge identifier │
│ title            │ VARCHAR(200)│ NOT NULL    │ Challenge title              │
│ description      │ TEXT        │ NOT NULL    │ Problem description         │
│ difficulty       │ VARCHAR(20) │ NOT NULL    │ 'easy', 'medium', 'hard'    │
│ language         │ VARCHAR(20) │ NOT NULL    │ 'javascript', 'java'       │
│ template         │ TEXT        │ NOT NULL    │ Starter code template       │
│ testCases        │ JSONB       │ NOT NULL    │ Array of test cases         │
│ createdByAI      │ BOOLEAN     │ DEFAULT true │ AI-generated flag            │
│ createdAt        │ TIMESTAMP   │ DEFAULT NOW │ Challenge creation time      │
│ updatedAt        │ TIMESTAMP   │ DEFAULT NOW │ Last update time             │
└──────────────────┴──────────────┴─────────────┴─────────────────────────────┘

testCases JSONB Format:
[
  {
    "input": "[1, 2, 3]",
    "output": "6"
  },
  {
    "input": "[4, 5, 6]",
    "output": "15"
  }
]
```

#### Submissions Table
```
┌──────────────────┬──────────────┬─────────────┬─────────────────────────────┐
│ Column Name      │ Data Type   │ Constraints │ Description                 │
├──────────────────┼──────────────┼─────────────┼─────────────────────────────┤
│ id               │ INTEGER     │ PK, AI      │ Unique submission identifier│
│ userId           │ INTEGER     │ FK, NN      │ References users(id)        │
│ challengeId      │ INTEGER     │ FK, NN      │ References challenges(id)    │
│ code             │ TEXT        │ NOT NULL    │ User's submitted code        │
│ language         │ VARCHAR(20) │ NOT NULL    │ Programming language used    │
│ status           │ VARCHAR(20) │ DEFAULT     │ 'passed', 'failed', 'error' │
│ output           │ TEXT        │ NULLABLE    │ Execution output/results     │
│ executionTime    │ INTEGER     │ NULLABLE    │ Execution time (ms)          │
│ createdAt        │ TIMESTAMP   │ DEFAULT NOW │ Submission time              │
│ updatedAt        │ TIMESTAMP   │ DEFAULT NOW │ Last update time             │
└──────────────────┴──────────────┴─────────────┴─────────────────────────────┘
```

### Database Indexes Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           INDEXING STRATEGY                                  │
└─────────────────────────────────────────────────────────────────────────────┘

USERS Table:
  • PRIMARY KEY: id
  • UNIQUE INDEX: username (for login lookups)
  • UNIQUE INDEX: email (for login lookups)
  • UNIQUE INDEX: googleId (for OAuth lookups)
  • UNIQUE INDEX: githubId (for OAuth lookups)
  • INDEX: xp (for leaderboard sorting - DESC)

CHALLENGES Table:
  • PRIMARY KEY: id
  • INDEX: difficulty (for filtering challenges)
  • INDEX: language (for filtering by language)
  • INDEX: createdAt (for recent challenges)
  • INDEX: createdByAI (for AI-generated challenges)

SUBMISSIONS Table:
  • PRIMARY KEY: id
  • FOREIGN KEY INDEX: userId (for user submission history)
  • FOREIGN KEY INDEX: challengeId (for challenge statistics)
  • INDEX: status (for filtering by status)
  • INDEX: createdAt (for recent submissions)
  • COMPOSITE INDEX: (userId, createdAt) - for user history queries
  • COMPOSITE INDEX: (challengeId, status) - for challenge stats
```

### Query Patterns

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        COMMON QUERY PATTERNS                                 │
└─────────────────────────────────────────────────────────────────────────────┘

1. User Login:
   SELECT * FROM users WHERE email = ? OR username = ?

2. Get User Submissions:
   SELECT * FROM submissions 
   WHERE userId = ? 
   ORDER BY createdAt DESC 
   LIMIT 50

3. Get Leaderboard:
   SELECT id, username, xp, level 
   FROM users 
   ORDER BY xp DESC 
   LIMIT 100

4. Get Challenge with Test Cases:
   SELECT * FROM challenges WHERE id = ?

5. Get User's Challenge History:
   SELECT c.*, s.status, s.createdAt as submittedAt
   FROM challenges c
   JOIN submissions s ON c.id = s.challengeId
   WHERE s.userId = ?
   ORDER BY s.createdAt DESC

6. Get Challenge Statistics:
   SELECT 
     COUNT(*) as total_submissions,
     SUM(CASE WHEN status = 'passed' THEN 1 ELSE 0 END) as passed,
     SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed
   FROM submissions
   WHERE challengeId = ?
```

---

## System Component Interaction

```
┌──────────────┐
│   Browser    │
└──────┬───────┘
       │
       │ HTTP Request
       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Load Balancer / Reverse Proxy            │
│                    (Optional - for production)               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Server (Next.js)                 │
│                    Port: 3000                                │
│                                                              │
│  • Serves React Components                                   │
│  • Handles Client-Side Routing                               │
│  • API Proxy to Backend                                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ REST API Calls
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend API Server (Express)             │
│                    Port: 3001                                │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Routes     │  │ Controllers  │  │  Services    │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                 │                  │              │
│         └─────────────────┴──────────────────┘              │
│                            │                                │
└────────────────────────────┼────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  PostgreSQL  │    │  AI Services │    │   Docker     │
│  Database    │    │              │    │   Engine     │
│              │    │  • Gemini    │    │              │
│  Port: 5433  │    │  • Groq      │    │  Socket API  │
└──────────────┘    └──────────────┘    └──────────────┘
```

---

## Security Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SECURITY LAYERS                                      │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────┐
│   Client     │
│  (Browser)   │
└──────┬───────┘
       │
       │ HTTPS (TLS/SSL)
       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Security Middleware                       │
│                                                              │
│  • CORS Protection                                           │
│  • Rate Limiting                                             │
│  • Input Validation                                          │
│  • SQL Injection Prevention (Sequelize ORM)                  │
│  • XSS Protection                                            │
└──────┬───────────────────────────────────────────────────────┘
       │
       │ JWT Authentication
       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Authentication Layer                      │
│                                                              │
│  • JWT Token Validation                                      │
│  • Password Hashing (bcrypt)                                 │
│  • OAuth 2.0 (Google, GitHub)                                │
│  • Session Management                                        │
└──────┬───────────────────────────────────────────────────────┘
       │
       │ Authorized Requests
       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                         │
│                                                              │
│  • Role-Based Access Control                                 │
│  • Resource Authorization                                    │
│  • Secure Code Execution (Docker Isolation)                 │
└─────────────────────────────────────────────────────────────┘
```

---

*Diagrams created for CodeArena project documentation*
