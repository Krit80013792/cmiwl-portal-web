<p align="center">
  <img src="" width="144" alt="">
</p>
<br/>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#technology">Technology</a> •
  <a href="#project-architecture-diagram">Project architecture diagram</a> 
  <br/>
</p>

---

# CMIWL PORTAL WEB

## Overview

"CMIWL" It is a ...

## Getting Started

First, run the development server:

```bash
npm i --legacy-peer-deps
```

```bash
npm run dev
```
or run with build
```bash
npm run build:start
```

> [!NOTE]
> Open [http://localhost:3000](http://localhost:3000) with your browser to see the main website result.

> [!NOTE]
> Open [http://localhost:3000/pw0wl](http://localhost:3000/pw0wl) with your browser to see the CMS result.

---

First, run test with jest:

```bash
npm run test
```
or
```bash
npm run test:watch
```
```bash
npm run test:cov
```
> [!NOTE]
> If failed. Try to `npm run build` then try again.

---

First, run load test with k6:\
Load test types: `Smoke`, `Average`, `Stress`, `Soak`, `Spike`, `Breakpoint`\
on tests/k6, replace url for test

eg.

```bash
k6 run smoke.js
```
> [!IMPORTANT]
> Makesure you have k6 installed.\
> [Learn more about k6](https://grafana.com/docs/k6/latest/get-started/running-k6/)

## Technology

#### Next.js 14
#### MongoDB Atlas
#### Custom theme, CSS for main website
#### PrimeTek PrimeReact, SakaiReact for CMS

## Learn More

To learn more about, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Learn Next.js](https://nextjs.org/learn)
-   [MongoDB Atlas](https://www.mongodb.com/)
-   [PrimeReact](https://primereact.org/)
-   [SakaiReact](https://sakai.primereact.org/)

---

## Project architecture diagram


```mermaid
graph TD

    25["MongoDB<br>Database"]
    8["User<br>External Actor"]

    subgraph 1["Backend API System<br>Next.js API Routes"]
        16["API Routes<br>Next.js API Routes"]
        22["Infrastructure Layer<br>MongoDB"]

        subgraph 2["Shared Utilities and Middleware<br>TypeScript"]
            23["Middleware<br>TypeScript"]
            24["Utilities<br>TypeScript"]
        end

        subgraph 3["Domain Layer<br>TypeScript"]
            20["Entities<br>TypeScript"]
            21["Models<br>TypeScript"]
        end

        subgraph 4["Application Layer<br>TypeScript"]
            17["DTOs<br>TypeScript"]
            18["Interfaces<br>TypeScript"]
            19["Services<br>TypeScript"]
        end

        %% Relations
        16 -->|orchestrates| 4
        16 -->|uses| 23
        16 -->|uses| 24
        4 -->|accesses| 22
        4 -->|uses| 24
        4 -->|uses| 3
        3 -->|defines| 20
        3 -->|defines| 21
        4 -->|defines| 17
        4 -->|implements| 18
    end

    subgraph 5["Frontend System<br>Next.js"]
        14["Client-side Services<br>TypeScript"]
        15["Static Assets<br>Web Server"]

        subgraph 6["Layout Components<br>React"]
            12["Primary Layout System<br>React"]
            13["CMI Layout System<br>React"]
        end

        subgraph 7["UI Pages and Routes<br>Next.js Pages"]
            10["CMS Portal Pages<br>Next.js Pages"]
            11["Main Application Pages<br>Next.js Pages"]
            9["Authentication Pages<br>Next.js Pages"]
        end

        %% Relations
        7 -->|uses| 6
        7 -->|uses| 14
        7 -->|serves| 15
    end

    %% Top-level relations
    8 -->|interacts with| 5
    5 -->|makes API calls to| 1
    1 -->|persists data in| 25
```
