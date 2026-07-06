document.addEventListener('DOMContentLoaded', () => {
  // ----- STATE -----
  let subjects = [];
  let nextId = 1;
  let whatIfMode = false;

  // DOM refs
  const subjectListEl = document.getElementById('subjectList');
  const semesterGpaEl = document.getElementById('semesterGpa');
  const cumulativeGpaEl = document.getElementById('cumulativeGpa');
  const whatIfGpaEl = document.getElementById('whatIfGpa');

  const modeStandard = document.getElementById('modeStandard');
  const modeWhatIf = document.getElementById('modeWhatIf');
  const modeLabel = document.getElementById('modeLabel');

  const addBtn = document.getElementById('addSubjectBtn');
  const nameInp = document.getElementById('subjectName');
  const creditsInp = document.getElementById('subjectCredits');
  const gradeSelect = document.getElementById('subjectGrade');
  const resetAllBtn = document.getElementById('resetAllBtn');

  // ----- helpers -----
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

  // ----- render -----
  function render() {
    // render subject list
    if (subjects.length === 0) {
      subjectListEl.innerHTML = `<p style="color:#386f8a; font-style:italic; padding:0.4rem 0;">No subjects added yet. Add your courses above.</p>`;
    } else {
      let html = '';
      for (let s of subjects) {
        html += `
          <div class="subject-item" data-id="${s.id}">
            <div class="info">
              <span class="name">${s.name}</span>
              <span class="credits">${s.credits} cr</span>
              <span class="grade">${s.grade}/10</span>
            </div>
            <button class="del-btn" data-id="${s.id}">✕</button>
          </div>
        `;
      }
      subjectListEl.innerHTML = html;

      // attach delete events
      document.querySelectorAll('.del-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.dataset.id);
          subjects = subjects.filter(s => s.id !== id);
          render();
        });
      });
    }

    // update GPA stats (out of 10)
    const semGpa = calcGPA(subjects);
    semesterGpaEl.textContent = semGpa !== null ? semGpa.toFixed(2) : '—';
    cumulativeGpaEl.textContent = semGpa !== null ? semGpa.toFixed(2) : '—';
    whatIfGpaEl.textContent = semGpa !== null ? semGpa.toFixed(2) : '—';
  }

    // ----- mode toggle -----
  function setMode(whatIf) {
    whatIfMode = whatIf;
    const whatIfControls = document.getElementById('whatIfControls');
    
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
    }
    render();
  }

  // ----- add subject -----
  function addSubject() {
    const name = nameInp.value.trim();
    const credits = parseFloat(creditsInp.value);
    const grade = parseFloat(gradeSelect.value);

    if (!name) { alert('Please enter a subject name.'); return; }
    if (isNaN(credits) || credits <= 0) { alert('Credits must be a positive number.'); return; }

    subjects.push({ id: nextId++, name, credits, grade });
    render();
    nameInp.value = '';
    creditsInp.value = '3';
    gradeSelect.value = '8';
  }

  // ----- reset all -----
  function resetAll() {
    if (subjects.length === 0) return;
    if (confirm('Remove all subjects?')) {
      subjects = [];
      nextId = 1;
      render();
    }
  }

  // ----- mode toggle -----
  function setMode(whatIf) {
    whatIfMode = whatIf;
    if (whatIf) {
      modeStandard.classList.remove('active');
      modeWhatIf.classList.add('active');
      modeLabel.textContent = '🔮 What‑if mode';
    } else {
      modeWhatIf.classList.remove('active');
      modeStandard.classList.add('active');
      modeLabel.textContent = '📘 Standard mode';
    }
    render();
  }

  // ----- event binding -----
  addBtn.addEventListener('click', addSubject);
  resetAllBtn.addEventListener('click', resetAll);
  modeStandard.addEventListener('click', () => setMode(false));
  modeWhatIf.addEventListener('click', () => setMode(true));

  nameInp.addEventListener('keydown', (e) => { if (e.key === 'Enter') addSubject(); });
  creditsInp.addEventListener('keydown', (e) => { if (e.key === 'Enter') addSubject(); });

  // initial render
  setMode(false);
});