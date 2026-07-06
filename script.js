document.addEventListener('DOMContentLoaded', () => {
  // ----- STATE -----
  let subjects = [];          // { id, name, credits, grade }
  let nextId = 1;
  let whatIfMode = false;
  let whatIfGpaCache = null;  // store last simulated value

  // ----- DOM REFS -----
  const subjectListEl = document.getElementById('subjectList');
  const semesterGpaEl = document.getElementById('semesterGpa');
  const cumulativeGpaEl = document.getElementById('cumulativeGpa');
  const whatIfGpaEl = document.getElementById('whatIfGpa');

  const modeStandard = document.getElementById('modeStandard');
  const modeWhatIf = document.getElementById('modeWhatIf');
  const modeLabel = document.getElementById('modeLabel');
  const whatIfControls = document.getElementById('whatIfControls');

  const addBtn = document.getElementById('addSubjectBtn');
  const nameInp = document.getElementById('subjectName');
  const creditsInp = document.getElementById('subjectCredits');
  const gradeSelect = document.getElementById('subjectGrade');

  const futureGpaInput = document.getElementById('futureGpaInput');
  const futureCreditsInput = document.getElementById('futureCreditsInput');
  const simulateBtn = document.getElementById('simulateBtn');
  const resetWhatIfBtn = document.getElementById('resetWhatIfBtn');
  const resetAllBtn = document.getElementById('resetAllBtn');

  // ----- HELPERS -----
  function calcGPA(subjArray) {
    if (!subjArray.length) return null;
    let totalPoints = 0, totalCredits = 0;
    for (let s of subjArray) {
      const c = parseFloat(s.credits);
      const g = parseFloat(s.grade);
      totalPoints += c * g;
      totalCredits += c;
    }
    if (totalCredits === 0) return null;
    return totalPoints / totalCredits;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ----- RENDER -----
  function render() {
    // Render subject list
    if (subjects.length === 0) {
      subjectListEl.innerHTML = `<p style="color:#386f8a; font-style:italic; padding:0.4rem 0;">No subjects added yet. Add your courses above.</p>`;
    } else {
      let html = '';
      for (let s of subjects) {
        html += `
          <div class="subject-item" data-id="${s.id}">
            <div class="info">
              <span class="name">${escapeHtml(s.name)}</span>
              <span class="credits">${s.credits} cr</span>
              <span class="grade">${s.grade}/10</span>
            </div>
            <button class="del-btn" data-id="${s.id}">✕</button>
          </div>
        `;
      }
      subjectListEl.innerHTML = html;

      // Attach delete events
      document.querySelectorAll('.del-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.dataset.id);
          subjects = subjects.filter(s => s.id !== id);
          render();
        });
      });
    }

    // Update GPA stats (out of 10)
    const semGpa = calcGPA(subjects);
    semesterGpaEl.textContent = semGpa !== null ? semGpa.toFixed(2) : '—';
    cumulativeGpaEl.textContent = semGpa !== null ? semGpa.toFixed(2) : '—';

    // What-if GPA display
    if (whatIfMode && subjects.length > 0 && whatIfGpaCache !== null) {
      whatIfGpaEl.textContent = whatIfGpaCache.toFixed(2);
    } else if (whatIfMode && subjects.length === 0) {
      whatIfGpaEl.textContent = '—';
    } else {
      whatIfGpaEl.textContent = semGpa !== null ? semGpa.toFixed(2) : '—';
    }
  }

  // ----- ADD SUBJECT -----
  function addSubject() {
    const name = nameInp.value.trim();
    const credits = parseFloat(creditsInp.value);
    const grade = parseFloat(gradeSelect.value);

    if (!name) { alert('Please enter a subject name.'); return; }
    if (isNaN(credits) || credits <= 0) { alert('Credits must be a positive number (min 0.5).'); return; }

    subjects.push({ id: nextId++, name, credits, grade });
    render();
    nameInp.value = '';
    creditsInp.value = '3';
    gradeSelect.value = '8';
  }

  // ----- WHAT-IF SIMULATION -----
  function runWhatIf() {
    if (!whatIfMode) {
      alert('Switch to What‑if mode first (click 🔮 What‑if).');
      return;
    }
    if (subjects.length === 0) {
      alert('Add at least one subject to simulate future CGPA.');
      return;
    }

    const futureGpa = parseFloat(futureGpaInput.value);
    const futureCredits = parseFloat(futureCreditsInput.value);

    if (isNaN(futureGpa) || futureGpa < 0 || futureGpa > 10) {
      alert('Future GPA must be between 0 and 10.');
      return;
    }
    if (isNaN(futureCredits) || futureCredits < 0) {
      alert('Future credits must be a positive number.');
      return;
    }

    let curPoints = 0, curCredits = 0;
    for (let s of subjects) {
      const c = parseFloat(s.credits);
      const g = parseFloat(s.grade);
      curPoints += c * g;
      curCredits += c;
    }

    const totalFutureCredits = curCredits + futureCredits;
    if (totalFutureCredits === 0) {
      whatIfGpaCache = null;
      render();
      return;
    }

    const totalPoints = curPoints + (futureGpa * futureCredits);
    const projected = totalPoints / totalFutureCredits;
    whatIfGpaCache = projected;
    render();
  }

  function resetWhatIf() {
    whatIfGpaCache = null;
    render();
    futureGpaInput.value = '8.5';
    futureCreditsInput.value = '15';
  }

  // ----- RESET ALL -----
  function resetAll() {
    if (subjects.length === 0) return;
    if (confirm('Remove all subjects?')) {
      subjects = [];
      nextId = 1;
      whatIfGpaCache = null;
      render();
    }
  }

  // ----- MODE TOGGLE -----
  function setMode(whatIf) {
    whatIfMode = whatIf;
    if (whatIf) {
      modeStandard.classList.remove('active');
      modeWhatIf.classList.add('active');
      modeLabel.textContent = '🔮 What‑if mode';
      whatIfControls.style.display = 'block';
    } else {
      modeWhatIf.classList.remove('active');
      modeStandard.classList.add('active');
      modeLabel.textContent = '📘 Standard mode';
      whatIfControls.style.display = 'none';
      whatIfGpaCache = null;
    }
    render();
  }

  // ----- EVENT BINDING -----
  addBtn.addEventListener('click', addSubject);
  resetAllBtn.addEventListener('click', resetAll);
  modeStandard.addEventListener('click', () => setMode(false));
  modeWhatIf.addEventListener('click', () => setMode(true));
  simulateBtn.addEventListener('click', runWhatIf);
  resetWhatIfBtn.addEventListener('click', resetWhatIf);

  nameInp.addEventListener('keydown', (e) => { if (e.key === 'Enter') addSubject(); });
  creditsInp.addEventListener('keydown', (e) => { if (e.key === 'Enter') addSubject(); });

  // Initial render
  setMode(false);
});