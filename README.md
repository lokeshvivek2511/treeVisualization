# Tree Visualization

## Overview
Tree Visualization is a web-based application designed to demonstrate tree data structures in a real-time application. It provides an interactive interface for managing hierarchical employee data.

## Features
- **Tree Structure Representation:** Visualize hierarchical employee relationships.
- **Employee Management:** Add, update, delete, and search employees.
- **Interactive UI:** Responsive and user-friendly design.
- **Backend API:** Handles employee data operations using Node.js.
- **Frontend:** Built with React.js and Tailwind CSS for modern UI design.

## Project Structure
```
lokeshvivek2511-treevisualization/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── data/
│   │   └── employee.json
│   └── src/
│       ├── routes.js
│       └── treeStructure.js
└── frontend/
    ├── package.json
    ├── tailwind.config.js
    ├── public/
    │   ├── index.html
    └── src/
        ├── App.js
        ├── components/
        │   ├── ControlPanel.js
        │   ├── DeleteEmployee.js
        │   ├── EmployeeForm.js
        │   ├── SearchEmployee.js
        │   ├── TreeVisualization.js
        │   └── UpdateEmployee.js
```

## Images

![image](https://github.com/user-attachments/assets/d505774a-48b3-4164-817e-ac5a0419ea32)
![image](https://github.com/user-attachments/assets/a986dc9d-9fe9-46dc-8f90-f12995fd9c9b)
![image](https://github.com/user-attachments/assets/231578a5-38f3-40c4-aab1-d79d27519ffa)
![image](https://github.com/user-attachments/assets/a4eeba7f-1b88-48fb-9888-eefee58df3ea)
![image](https://github.com/user-attachments/assets/e7c19d01-da15-4deb-916b-fa75853206a0)
![image](https://github.com/user-attachments/assets/fc40a05b-bf2f-4995-97b5-82a0e4acc4bb)



## Installation
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14+ recommended)
- **npm** (or yarn)

### Setup Instructions
#### Backend
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm start
   ```

#### Frontend
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend application:
   ```sh
   npm start
   ```

## Usage
1. Open the application in your browser at `http://localhost:3000`.
2. Use the control panel to manage employees.
3. The tree visualization updates dynamically as changes are made.

## Technologies Used
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** JSON file (for simplicity)

## Contributing
Feel free to fork this repository and contribute! Submit a pull request with any improvements.

## License
This project is licensed under the MIT License.

## Contact
For any questions or suggestions, reach out to:
- **GitHub:** [lokeshvivek2511](https://github.com/lokeshvivek2511)
- **Email:** lokeshvlw2004@gmail.com

