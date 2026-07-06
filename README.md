# 🎓 CGPA Calculator

> A comprehensive CGPA (Cumulative Grade Point Average) calculator with "what-if" simulation capabilities. Built with vanilla HTML, CSS, and JavaScript.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTML](https://img.shields.io/badge/HTML-5-orange.svg)
![CSS](https://img.shields.io/badge/CSS-3-blue.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)

---

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Installation](#-installation)
- [Usage Guide](#-usage-guide)
- [Grade System](#-grade-system)
- [How It Works](#-how-it-works)
- [Project Structure](#-project-structure)
- [Development Commits](#-development-commits)
- [Customization](#-customization)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 📘 Standard Mode
- ✅ Add subjects with names, credits, and grades
- ✅ Automatically calculate semester GPA
- ✅ View cumulative CGPA
- ✅ Delete individual subjects
- ✅ Reset all subjects with confirmation

### 🔮 What-If Mode
- ✅ Simulate future semester performance
- ✅ Enter expected GPA and credits for future semesters
- ✅ See projected CGPA by graduation
- ✅ Reset simulation with one click

### 🎨 User Experience
- ✅ Clean, modern UI with glass-morphism design
- ✅ Responsive layout for all devices
- ✅ Real-time updates
- ✅ Keyboard shortcuts (Enter to add subjects)
- ✅ Visual feedback on interactions

---

## 🚀 Demo

### Standard Mode

```
┌─────────────────────────────────────────────────────────────┐
│  [Add Subject Form]                                        │
│  Subject: Data Structures  |  Credits: 3  |  Grade: 8/10  │
│  [Add]                                                     │
├─────────────────────────────────────────────────────────────┤
│  [Subject List]                                            │
│  📚 Data Structures    3 cr    8.0/10  ✕                  │
│  📚 Algorithms         4 cr    9.0/10  ✕                  │
│  📚 Database Systems   3 cr    7.5/10  ✕                  │
├─────────────────────────────────────────────────────────────┤
│  [Summary]                                                 │
│  Semester GPA:  8.17/10                                    │
│  Cumulative CGPA: 8.17/10                                  │
│  What-if CGPA: 8.17/10                                    │
└─────────────────────────────────────────────────────────────┘
```

### What-If Mode

```
┌─────────────────────────────────────────────────────────────┐
│  [What-If Controls]                                        │
│  Future GPA: 9.0  |  Future Credits: 15                   │
│  [Simulate] [Reset]                                        │
├─────────────────────────────────────────────────────────────┤
│  [Updated Summary]                                         │
│  Semester GPA:  8.17/10                                    │
│  Cumulative CGPA: 8.17/10                                  │
│  What-if CGPA: 8.45/10  ← Projected CGPA                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Installation

### Option 1: Quick Start
1. Download all three files:
   - `index.html`
   - `style.css`
   - `script.js`
2. Place them in the same folder
3. Open `index.html` in your browser

### Option 2: Clone Repository
```bash
git clone https://github.com/yourusername/cgpa-calculator.git
cd cgpa-calculator
open index.html
```

### Option 3: Development Setup
```bash
# Serve locally with any HTTP server
python3 -m http.server 8000
# or
npx serve
# then visit http://localhost:8000
```

---

## 📖 Usage Guide

### Adding Subjects
1. Enter the **Subject Name** (e.g., "Data Structures")
2. Enter **Credits** (e.g., 3)
3. Select **Grade** from the dropdown (A+ to F)
4. Click **Add** or press **Enter**

### Managing Subjects
- **Delete**: Click the ✕ button next to any subject
- **Reset All**: Click the "Reset all subjects" button

### Using What-If Mode
1. Click the **🔮 What-if** button
2. Enter your expected **Future GPA** (0-10 scale)
3. Enter the total **Future Credits** you plan to take
4. Click **Simulate** to see projected CGPA
5. Click **Reset** to clear the simulation

### Keyboard Shortcuts
- `Enter` in Subject or Credits field: Add current subject
- `Enter` in Future GPA or Credits field: Run simulation

---

## 📊 Grade System

The calculator uses a **10-point GPA scale**:

| Grade | Points | Description |
|-------|--------|-------------|
| A+    | 10     | Outstanding |
| A     | 9      | Excellent   |
| B+    | 8      | Very Good   |
| B     | 7      | Good        |
| C+    | 6      | Above Average|
| C     | 5      | Average     |
| D     | 4      | Pass        |
| F     | 0      | Fail        |

### Calculation Formula
```
Semester GPA = Σ (Credits × Grade) / Σ Credits
CGPA = Σ (All Credits × All Grades) / Σ All Credits
```

---

## 🔧 How It Works

### State Management
```javascript
// Subject object structure
{
  id: 1,
  name: "Data Structures",
  credits: 3,
  grade: 8.0
}
```

### Core Functions
| Function | Description |
|----------|-------------|
| `addSubject()` | Validates input and adds to subjects array |
| `calcGPA()` | Calculates GPA from subject array |
| `runWhatIf()` | Simulates future performance |
| `render()` | Updates UI with current state |

### What-If Calculation
```javascript
Current Points = Σ (Credits × Grades)
Current Credits = Σ Credits
Future Points = Future GPA × Future Credits
Projected CGPA = (Current Points + Future Points) / (Current Credits + Future Credits)
```

---

## 📁 Project Structure

```
cgpa-calculator/
├── index.html          # Main HTML structure
├── style.css           # All styles and animations
├── script.js           # Complete application logic
└── README.md           # Documentation
```

### File Descriptions

#### `index.html`
- Semantic HTML5 structure
- Accessible form elements
- Responsive layout containers
- Mode toggle controls
- What-if simulation panel

#### `style.css`
- Glass-morphism design system
- CSS custom properties
- Responsive grid layouts
- Smooth animations and transitions
- Custom scrollbar styling
- Mobile-first approach

#### `script.js`
- Pure JavaScript (no frameworks)
- Event-driven architecture
- State management
- DOM manipulation
- Input validation
- GPA calculation engine

---

## 📦 Development Commits

The project was built in 10 logical commits:

| Commit | Description |
|--------|-------------|
| 1 | Project setup & basic HTML structure |
| 2 | Add subject logic & state management |
| 3 | Delete subject & GPA calculation logic |
| 4 | Style subject items & delete button |
| 5 | Mode toggle UI & logic |
| 6 | What-if controls UI |
| 7 | Show/hide what-if controls on mode switch |
| 8 | What-if simulation logic |
| 9 | Display what-if results in UI |
| 10 | Final polish & code organization |

---

## 🎨 Customization

### Change Grade Scale
Edit the grade options in `index.html`:
```html
<select id="subjectGrade">
  <option value="10">A+ (10)</option>
  <option value="9">A (9)</option>
  <option value="8" selected>B+ (8)</option>
  <option value="7">B (7)</option>
  <option value="6">C+ (6)</option>
  <option value="5">C (5)</option>
  <option value="4">D (4)</option>
  <option value="0">F (0)</option>
</select>
```

### Modify Colors
Update CSS variables in `style.css`:
```css
.card {
  background: rgba(255, 255, 255, 0.8);
  /* Change opacity or color */
}

.btn-add {
  background: #1f6f93;
  /* Change primary color */
}

.btn-simulate {
  background: #6f4f8a;
  /* Change what-if button color */
}
```

---

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 60+ | ✅ Full |
| Firefox | 60+ | ✅ Full |
| Safari | 12+ | ✅ Full |
| Edge | 79+ | ✅ Full |
| Opera | 50+ | ✅ Full |
| IE | - | ❌ Not supported |

---

## 🤝 Contributing

### How to Contribute
1. **Fork** the repository
2. **Clone** your fork
3. **Create** a feature branch
4. **Make** your changes
5. **Test** thoroughly
6. **Submit** a pull request

### Reporting Issues
When reporting issues, please include:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

```
MIT License

Copyright (c) 2026 Mansoor Khan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- Design inspired by modern glass-morphism UI trends
- GPA calculation formula based on standard university systems
- Built with ❤️ using vanilla technologies

---

## ⭐ Star this repository if you found it useful!

---

*Last Updated: July 2026*
```
