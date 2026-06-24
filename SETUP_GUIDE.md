# Mokarrmal Restaurant - Project Setup Guide

Welcome to the Mokarrmal Restaurant 3D Website repository! This guide contains everything you need to install and configure on your machine to successfully run and contribute to this project.

## 🛠️ Prerequisites (What to Install)

Before cloning the project, ensure you have the following installed on your laptop:

1. **Git**
   - **Why:** To clone the repository and push your changes.
   - **Download:** [git-scm.com](https://git-scm.com/downloads)

2. **Node.js (LTS version)**
   - **Why:** The runtime environment required to run Next.js and React.
   - **Version:** v18.17.0 or newer (v20+ recommended).
   - **Download:** [nodejs.org](https://nodejs.org/)

3. **Yarn Package Manager (Highly Recommended)**
   - **Why:** We recommend using Yarn over standard NPM for this project because it perfectly handles our specific 3D animation dependencies (GSAP, Framer Motion, Three.js) without triggering the version resolution bugs occasionally found in older NPM versions.
   - **Install:** Once Node.js is installed, open your terminal and run:
     ```bash
     npm install --global yarn
     ```

4. **VS Code (Recommended Editor)**
   - **Why:** Best support for TypeScript and React.
   - **Download:** [code.visualstudio.com](https://code.visualstudio.com/)
   - **Recommended Extensions:**
     - *Tailwind CSS IntelliSense* (For styling autocomplete)
     - *ESLint* (For code linting)
     - *Prettier* (For code formatting)

---

## 🚀 How to Run the Project Locally

Once you have the prerequisites installed, follow these steps:

**1. Clone the Repository**
Open your terminal and clone the repository (replace the URL with the actual Git URL):
```bash
git clone <YOUR_GIT_REPOSITORY_URL>
```

**2. Navigate into the Project**
```bash
cd <PROJECT_FOLDER_NAME>
```

**3. Install Dependencies**
Use Yarn to cleanly install all the required Next.js, 3D, and animation libraries:
```bash
yarn install
```

**4. Start the Development Server**
```bash
yarn dev
```

**5. View the Website**
Open your browser and navigate to:
[http://localhost:3000](http://localhost:3000)

---

## 📦 Key Technologies Used
If you are diving into the codebase, here is our tech stack:
- **Framework:** Next.js 15 (React 19 RC)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion & GSAP
- **3D Graphics:** Three.js, React Three Fiber, React Three Drei
- **Language/i18n:** Custom React Context (Supports English and Arabic LTR/RTL)
