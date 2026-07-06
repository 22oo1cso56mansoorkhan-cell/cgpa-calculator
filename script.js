document.addEventListener('DOMContentLoaded', () => {
  // ----- STATE -----
  let subjects = [];
  let nextId = 1;

  // DOM refs
  const subjectListEl = document.getElementById('subjectList');
  const semesterGpaEl = document.getElementById('semesterGpa');
  const cumulativeGpaEl = document.getElementById('cumulativeGpa');
  const whatIfGpaEl = document.getElementById('whatIfGpa');

  const addBtn = document.getElementById('addSubjectBtn');
  const nameInp = document.getElementById('subjectName');
  const creditsInp = document.getElementById('subjectCredits');
  const gradeSelect = document.getElementById('subjectGrade');
  const resetAllBtn = document.getElementById('resetAllBtn');

  // ----- render function -----
  function render() {
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
              <span class="grade">${s.grade}</span>
            </div>
            <button class="del-btn" data-id="${s.id}">✕</button>
          </div>
        `;
      }
      subjectListEl.innerHTML = html;
    }
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
    gradeSelect.value = '3.0';
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

  // ----- event binding -----
  addBtn.addEventListener('click', addSubject);
  resetAllBtn.addEventListener('click', resetAll);

  nameInp.addEventListener('keydown', (e) => { if (e.key === 'Enter') addSubject(); });
  creditsInp.addEventListener('keydown', (e) => { if (e.key === 'Enter') addSubject(); });

  // initial render
  render();
});