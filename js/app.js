/**
 * BridgeBuilder AI - Main Application Controller
 * Handles UI interactions, tab switching, form states, API orchestration, and modal displays.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Lucide Icons initialization helper
  const initIcons = () => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  // Toast Notification System
  window.showToast = (message, type = 'info') => {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    const bgColors = {
      success: 'bg-emerald-600 text-white',
      error: 'bg-rose-600 text-white',
      info: 'bg-slate-800 text-white',
      warning: 'bg-amber-600 text-white'
    };

    toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl transition-all duration-300 transform translate-y-2 opacity-0 text-sm font-medium ${bgColors[type] || bgColors.info}`;
    toast.innerHTML = `
      <span>${message}</span>
      <button class="ml-auto opacity-75 hover:opacity-100">&times;</button>
    `;

    toast.querySelector('button').onclick = () => toast.remove();
    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  // =========================================================================
  // TAB ROUTING
  // =========================================================================
  const tabs = document.querySelectorAll('.nav-tab');
  const panels = document.querySelectorAll('.tab-panel');

  const switchTab = (targetTabId) => {
    tabs.forEach(tab => {
      const isActive = tab.dataset.tab === targetTabId;
      tab.classList.toggle('active-tab', isActive);
      tab.classList.toggle('text-amber-600', isActive);
      tab.classList.toggle('border-amber-500', isActive);
      tab.classList.toggle('border-transparent', !isActive);
      tab.classList.toggle('text-slate-600', !isActive);
    });

    panels.forEach(panel => {
      panel.classList.toggle('hidden', panel.id !== `panel-${targetTabId}`);
    });

    initIcons();
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(tab.dataset.tab);
    });
  });

  // =========================================================================
  // API KEY MODAL MANAGEMENT
  // =========================================================================
  const apiKeyModal = document.getElementById('apiKeyModal');
  const btnOpenApiKey = document.getElementById('btnOpenApiKey');
  const btnCloseApiKey = document.getElementById('btnCloseApiKey');
  const btnSaveApiKey = document.getElementById('btnSaveApiKey');
  const inputApiKey = document.getElementById('inputApiKey');
  const apiKeyStatusBadge = document.getElementById('apiKeyStatusBadge');

  const updateApiKeyUI = () => {
    const hasKey = window.geminiService.hasApiKey();
    if (apiKeyStatusBadge) {
      apiKeyStatusBadge.innerHTML = hasKey
        ? '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> Live Gemini Flash API</span>'
        : '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300"><span class="w-2 h-2 rounded-full bg-amber-500"></span> Instant Preset Demo Mode</span>';
    }
  };

  if (btnOpenApiKey && apiKeyModal) {
    btnOpenApiKey.addEventListener('click', () => {
      inputApiKey.value = window.geminiService.getApiKey();
      apiKeyModal.classList.remove('hidden');
    });

    btnCloseApiKey.addEventListener('click', () => {
      apiKeyModal.classList.add('hidden');
    });

    btnSaveApiKey.addEventListener('click', () => {
      window.geminiService.setApiKey(inputApiKey.value);
      apiKeyModal.classList.add('hidden');
      updateApiKeyUI();
      window.showToast('API Key settings updated successfully!', 'success');
    });
  }
  updateApiKeyUI();

  // =========================================================================
  // 8-TRACK FRAMEWORK ROADMAP MODAL
  // =========================================================================
  const roadmapModal = document.getElementById('roadmapModal');
  const btnOpenRoadmap = document.getElementById('btnOpenRoadmap');
  const btnCloseRoadmap = document.getElementById('btnCloseRoadmap');
  const btnCloseRoadmapBottom = document.getElementById('btnCloseRoadmapBottom');

  if (btnOpenRoadmap && roadmapModal) {
    btnOpenRoadmap.addEventListener('click', () => {
      roadmapModal.classList.remove('hidden');
      initIcons();
    });

    if (btnCloseRoadmap) {
      btnCloseRoadmap.addEventListener('click', () => {
        roadmapModal.classList.add('hidden');
      });
    }

    if (btnCloseRoadmapBottom) {
      btnCloseRoadmapBottom.addEventListener('click', () => {
        roadmapModal.classList.add('hidden');
      });
    }
  }

  // =========================================================================
  // MODULE 1: AROGYACARD (Doctor Visit Triage Card Generator)
  // =========================================================================
  let selectedSymptom = 'Stomach / Abdominal Pain';
  let selectedSymptomTe = 'కడుపు నొప్పి / మంట';
  let activeDoctorCardData = null;

  // Symptom Chips Selection
  const symptomChips = document.querySelectorAll('.symptom-chip');
  symptomChips.forEach(chip => {
    chip.addEventListener('click', () => {
      symptomChips.forEach(c => {
        c.classList.remove('bg-amber-600', 'text-white', 'border-amber-600', 'shadow-md');
        c.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      });
      chip.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
      chip.classList.add('bg-amber-600', 'text-white', 'border-amber-600', 'shadow-md');

      selectedSymptom = chip.dataset.symptom;
      selectedSymptomTe = chip.dataset.te;
    });
  });

  // Pain slider listener
  const painSlider = document.getElementById('painSlider');
  const painDisplay = document.getElementById('painDisplay');
  const painLabel = document.getElementById('painLabel');

  if (painSlider && painDisplay) {
    const updatePainScale = () => {
      const val = parseInt(painSlider.value, 10);
      painDisplay.textContent = val;
      if (val <= 3) {
        painDisplay.className = 'text-2xl font-bold text-emerald-600';
        painLabel.textContent = 'తేలికపాటి నొప్పి (Mild discomfort)';
      } else if (val <= 6) {
        painDisplay.className = 'text-2xl font-bold text-amber-600';
        painLabel.textContent = 'మధ్యస్థ నొప్పి (Moderate pain)';
      } else {
        painDisplay.className = 'text-2xl font-bold text-rose-600';
        painLabel.textContent = 'తీవ్రమైన భరించలేని నొప్పి (Severe acute distress)';
      }
    };
    painSlider.addEventListener('input', updatePainScale);
    updatePainScale();
  }

  // Generate Doctor Card Form Submission
  const btnGenerateDoctorCard = document.getElementById('btnGenerateDoctorCard');
  const doctorCardResult = document.getElementById('doctorCardResult');
  const doctorCardPlaceholder = document.getElementById('doctorCardPlaceholder');
  const doctorCardLoading = document.getElementById('doctorCardLoading');

  if (btnGenerateDoctorCard) {
    btnGenerateDoctorCard.addEventListener('click', async () => {
      const painLevel = painSlider.value;
      const painChecked = document.querySelector('input[name="painType"]:checked');
      const painType = painChecked ? painChecked.value : 'Burning';
      const durationEl = document.getElementById('symptomDuration');
      const duration = durationEl ? durationEl.value : '2 days';
      const medEl = document.getElementById('currentMedications');
      const medications = medEl ? medEl.value : 'Metformin 500mg, Amlodipine 5mg';
      const condEl = document.getElementById('medicalConditions');
      const conditions = condEl ? condEl.value : 'Diabetes Type 2, Hypertension';
      const noteEl = document.getElementById('patientNotes');
      const notes = noteEl ? noteEl.value : '';

      // UI state -> loading
      doctorCardResult.classList.add('hidden');
      doctorCardPlaceholder.classList.add('hidden');
      doctorCardLoading.classList.remove('hidden');

      try {
        const result = await window.geminiService.generateDoctorVisitCard({
          symptom: selectedSymptom,
          symptomTe: selectedSymptomTe,
          painLevel,
          painType,
          duration,
          medications,
          conditions,
          notes
        });

        activeDoctorCardData = result;
        renderDoctorCard(result);
        doctorCardResult.classList.remove('hidden');
        window.showToast('Clinical triage intake card generated!', 'success');
      } catch (err) {
        console.error(err);
        window.showToast('Failed to generate card: ' + err.message, 'error');
        doctorCardPlaceholder.classList.remove('hidden');
      } finally {
        doctorCardLoading.classList.add('hidden');
        initIcons();
      }
    });
  }

  // Render Doctor Card Data
  const renderDoctorCard = (data) => {
    document.getElementById('cardChiefComplaint').textContent = data.chiefComplaint;
    document.getElementById('cardOnset').textContent = data.onset;
    document.getElementById('cardSeverity').textContent = data.severity;
    document.getElementById('cardHpiSummary').textContent = data.hpiSummary;
    document.getElementById('cardTeluguSummary').textContent = data.teluguSummary;
    document.getElementById('cardNurseNotes').textContent = data.nurseQuickNotes;
    
    // Medications list
    const medsList = document.getElementById('cardMedsList');
    medsList.innerHTML = (data.medications || []).map(m => `<span class="inline-block bg-slate-100 text-slate-800 px-2.5 py-1 rounded text-xs font-semibold mr-1.5 mb-1.5">${m}</span>`).join('');

    // Nurse modal bindings
    document.getElementById('nurseModalComplaint').textContent = data.chiefComplaint;
    document.getElementById('nurseModalHpi').textContent = data.hpiSummary;
    document.getElementById('nurseModalVitals').textContent = `Pain: ${data.severity} | Onset: ${data.onset}`;
    document.getElementById('nurseModalMeds').textContent = (data.medications || []).join(', ') || 'None reported';
    document.getElementById('nurseModalAllergies').textContent = data.allergies || 'NKDA';
    document.getElementById('nurseModalNotes').textContent = data.nurseQuickNotes;
  };

  // Fullscreen Nurse Modal
  const nurseModal = document.getElementById('nurseModal');
  const btnShowNurseModal = document.getElementById('btnShowNurseModal');
  const btnCloseNurseModal = document.getElementById('btnCloseNurseModal');

  if (btnShowNurseModal && nurseModal) {
    btnShowNurseModal.addEventListener('click', () => {
      nurseModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      initIcons();
    });

    btnCloseNurseModal.addEventListener('click', () => {
      nurseModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });
  }

  // Print Doctor Card
  const btnPrintDoctorCard = document.getElementById('btnPrintDoctorCard');
  if (btnPrintDoctorCard) {
    btnPrintDoctorCard.addEventListener('click', () => {
      window.print();
    });
  }

  // Audio Playback for Doctor Card
  const btnListenEnglish = document.getElementById('btnListenEnglish');
  const btnListenTelugu = document.getElementById('btnListenTelugu');

  if (btnListenEnglish) {
    btnListenEnglish.addEventListener('click', () => {
      if (!activeDoctorCardData) return;
      const text = `${activeDoctorCardData.chiefComplaint}. ${activeDoctorCardData.hpiSummary}`;
      window.speechEngine.speak(text, 'en-US');
    });
  }

  if (btnListenTelugu) {
    btnListenTelugu.addEventListener('click', () => {
      if (!activeDoctorCardData) return;
      window.speechEngine.speak(activeDoctorCardData.englishSummary, 'en-US');
    });
  }

  // Preset button for ArogyaCard
  const btnPresetElderlyPain = document.getElementById('btnPresetElderlyPain');
  if (btnPresetElderlyPain) {
    btnPresetElderlyPain.addEventListener('click', () => {
      // Select Stomach Chip
      const chip = Array.from(symptomChips).find(c => c.dataset.symptom.includes('Stomach'));
      if (chip) chip.click();
      if (painSlider) {
        painSlider.value = 8;
        painSlider.dispatchEvent(new Event('input'));
      }
      document.getElementById('symptomDuration').value = '2 days (రెండు రోజుల నుండి)';
      document.getElementById('currentMedications').value = 'Metformin 500mg, Amlodipine 5mg';
      document.getElementById('medicalConditions').value = 'Type 2 Diabetes, High Blood Pressure';
      btnGenerateDoctorCard.click();
    });
  }

  // =========================================================================
  // MODULE 2: EDUBRIDGE (School Flyer to Calendar & Tasks)
  // =========================================================================
  const schoolFlyerInput = document.getElementById('schoolFlyerInput');
  const btnExtractSchoolSchedule = document.getElementById('btnExtractSchoolSchedule');
  const btnPresetFriscoISD = document.getElementById('btnPresetFriscoISD');
  const schoolScheduleResult = document.getElementById('schoolScheduleResult');
  const schoolScheduleLoading = document.getElementById('schoolScheduleLoading');
  const schoolSchedulePlaceholder = document.getElementById('schoolSchedulePlaceholder');
  const eventsListContainer = document.getElementById('eventsListContainer');
  const btnDownloadAllIcs = document.getElementById('btnDownloadAllIcs');

  let activeParsedEvents = [];

  const sampleFriscoISDFlyerText = `CENTENNIAL ELEMENTARY - FRISCO ISD
IMPORTANT FALL DATES & PARENT NOTICES:

1. Early Dismissal Day - Next Wednesday at 12:00 PM
All students will be dismissed at 12:00 PM sharp for teacher staff training. Kindergarten through 5th grade parents must be in the carpool line by 12:00 PM. No after-school care provided.

2. State Immunization Records Deadline - Friday, Oct 12th
Texas law requires complete 30-day updated vaccination records for all newly enrolled students. Please submit records to the school nurse office or upload to the online portal.

3. Staff Development / In-Service Day - Monday, Oct 22nd
No school for students. All campus offices closed.

4. Fall Picture Day & Spirit Colors - Thursday, Nov 1st
Students wear yellow or royal blue school colors. Picture order forms are due with $15 payment or receipt code.`;

  if (btnPresetFriscoISD && schoolFlyerInput) {
    btnPresetFriscoISD.addEventListener('click', () => {
      schoolFlyerInput.value = sampleFriscoISDFlyerText;
      btnExtractSchoolSchedule.click();
    });
  }

  if (btnExtractSchoolSchedule) {
    btnExtractSchoolSchedule.addEventListener('click', async () => {
      const text = schoolFlyerInput.value.trim();
      if (!text) {
        window.showToast('Please paste a school flyer text or click the preset button!', 'warning');
        return;
      }

      schoolScheduleResult.classList.add('hidden');
      schoolSchedulePlaceholder.classList.add('hidden');
      schoolScheduleLoading.classList.remove('hidden');

      try {
        const data = await window.geminiService.parseSchoolDocument(text);
        activeParsedEvents = data.events || [];
        renderSchoolEvents(data);
        schoolScheduleResult.classList.remove('hidden');
        window.showToast(`Extracted ${activeParsedEvents.length} calendar events and deadlines!`, 'success');
      } catch (err) {
        console.error(err);
        window.showToast('Failed to parse flyer: ' + err.message, 'error');
        schoolSchedulePlaceholder.classList.remove('hidden');
      } finally {
        schoolScheduleLoading.classList.add('hidden');
        initIcons();
      }
    });
  }

  const renderSchoolEvents = (data) => {
    document.getElementById('schoolNameDisplay').textContent = data.schoolName || 'Elementary School';
    document.getElementById('schoolSummaryDisplay').textContent = data.summary || '';

    eventsListContainer.innerHTML = (data.events || []).map((evt, idx) => {
      const googleLink = window.calendarGenerator.createGoogleCalendarLink({
        title: evt.title,
        description: `${evt.actionRequired}\n\nTelugu Note: ${evt.teluguTitle}`,
        location: evt.location,
        startDate: evt.date,
        isAllDay: evt.isAllDay
      });

      const categoryBadges = {
        'Early Release': 'bg-amber-100 text-amber-800 border-amber-200',
        'Deadline': 'bg-rose-100 text-rose-800 border-rose-200',
        'Holiday': 'bg-blue-100 text-blue-800 border-blue-200',
        'Activity': 'bg-purple-100 text-purple-800 border-purple-200'
      };
      const badgeClass = categoryBadges[evt.category] || 'bg-slate-100 text-slate-800 border-slate-200';

      return `
        <div class="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-md transition-all">
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div class="space-y-1.5 flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeClass}">${evt.category || 'Event'}</span>
                <span class="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${evt.date} (${evt.time || 'All Day'})
                </span>
              </div>
              <h4 class="font-bold text-slate-900 text-base">${evt.title}</h4>
              <p class="font-telugu text-sm text-slate-700 bg-amber-50/60 p-2 rounded-lg border border-amber-100">
                <span class="font-semibold text-amber-900">తెలుగు అర్థం:</span> ${evt.teluguTitle}
              </p>
              <p class="text-xs text-slate-600 flex items-center gap-1.5 pt-1">
                <span class="font-semibold text-slate-700">Action:</span> ${evt.actionRequired}
              </p>
            </div>
            <div class="flex sm:flex-col gap-2 shrink-0 justify-end">
              <a href="${googleLink}" target="_blank" rel="noopener noreferrer" class="btn-tap inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold border border-blue-200">
                <i data-lucide="external-link" class="w-3.5 h-3.5"></i> Google Cal
              </a>
              <button class="btn-tap btn-single-ics inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200" data-idx="${idx}">
                <i data-lucide="download" class="w-3.5 h-3.5"></i> .ics
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach single ics handlers
    document.querySelectorAll('.btn-single-ics').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const evt = data.events[idx];
        if (evt) {
          window.calendarGenerator.downloadICS([evt], `${evt.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`);
          window.showToast('Event .ics downloaded!', 'info');
        }
      });
    });
  };

  // Download All Events in 1 .ics file
  if (btnDownloadAllIcs) {
    btnDownloadAllIcs.addEventListener('click', () => {
      if (!activeParsedEvents.length) return;
      window.calendarGenerator.downloadICS(activeParsedEvents, 'School_Schedule_All_Events.ics');
      window.showToast('Full school schedule .ics downloaded! Opening in your calendar...', 'success');
    });
  }

  // =========================================================================
  // MODULE 3: DECODR (Legal Clause & Form Demystifier)
  // =========================================================================
  const legalClauseInput = document.getElementById('legalClauseInput');
  const btnDecodeNotice = document.getElementById('btnDecodeNotice');
  const btnPresetLeaseClause = document.getElementById('btnPresetLeaseClause');
  const decodrResult = document.getElementById('decodrResult');
  const decodrLoading = document.getElementById('decodrLoading');
  const decodrPlaceholder = document.getElementById('decodrPlaceholder');
  const btnListenDecodrTe = document.getElementById('btnListenDecodrTe');
  const btnCopyCounterScript = document.getElementById('btnCopyCounterScript');

  let activeDecodrData = null;

  const sampleLeaseText = `SECTION 24: LEASE RENEWAL AND VACATING REQUIREMENTS
Resident agrees that Resident shall give Management at least sixty (60) days written notice prior to the expiration of the Lease Contract indicating whether Resident intends to vacate or renew. Failure to provide such written notice shall constitute an automatic election by Resident to continue the lease on a Month-to-Month basis, subject to market renewal rate adjustments (determined solely by Management) and an administrative Non-Notice Penalty of $500.00. Resident forfeits security deposit if vacating without certified notice receipt.`;

  if (btnPresetLeaseClause && legalClauseInput) {
    btnPresetLeaseClause.addEventListener('click', () => {
      legalClauseInput.value = sampleLeaseText;
      btnDecodeNotice.click();
    });
  }

  if (btnDecodeNotice) {
    btnDecodeNotice.addEventListener('click', async () => {
      const text = legalClauseInput.value.trim();
      if (!text) {
        window.showToast('Please paste a clause or click the sample lease preset!', 'warning');
        return;
      }

      decodrResult.classList.add('hidden');
      decodrPlaceholder.classList.add('hidden');
      decodrLoading.classList.remove('hidden');

      try {
        const data = await window.geminiService.decodeLegalDocument(text);
        activeDecodrData = data;
        renderDecodrResult(data);
        decodrResult.classList.remove('hidden');
        window.showToast('Notice decoded into plain Telugu & action checklist!', 'success');
      } catch (err) {
        console.error(err);
        window.showToast('Failed to decode document: ' + err.message, 'error');
        decodrPlaceholder.classList.remove('hidden');
      } finally {
        decodrLoading.classList.add('hidden');
        initIcons();
      }
    });
  }

  const renderDecodrResult = (data) => {
    document.getElementById('decodrDocType').textContent = data.documentType;
    document.getElementById('decodrEnglishMeaning').textContent = data.plainMeaning.english;
    document.getElementById('decodrTeluguMeaning').textContent = data.plainMeaning.telugu;

    // Action Items list
    const actionsContainer = document.getElementById('decodrActionItems');
    actionsContainer.innerHTML = (data.actionItems || []).map(item => `
      <li class="flex items-start gap-2.5 p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
        <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600 mt-0.5 shrink-0"></i>
        <div class="text-xs text-slate-700">
          <p class="font-semibold text-slate-900">${item.action}</p>
          <p class="font-telugu text-slate-600 mt-0.5">${item.actionTe}</p>
          ${item.deadline ? `<span class="inline-block mt-1 font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded text-[11px]">Deadline: ${item.deadline}</span>` : ''}
        </div>
      </li>
    `).join('');

    // Pitfalls & Fees
    const pitfallsContainer = document.getElementById('decodrPitfalls');
    pitfallsContainer.innerHTML = (data.pitfallsAndFees || []).map(p => `
      <li class="flex items-start gap-2.5 p-2 rounded-lg bg-rose-50/60 border border-rose-100">
        <i data-lucide="alert-triangle" class="w-4 h-4 text-rose-600 mt-0.5 shrink-0"></i>
        <div class="text-xs text-slate-700">
          <p class="font-semibold text-rose-900">${p.risk}</p>
          <p class="font-telugu text-rose-700 mt-0.5">${p.riskTe}</p>
        </div>
      </li>
    `).join('');

    // Counter Response Script
    document.getElementById('decodrScriptText').textContent = data.counterResponseScript || 'No reply needed.';
  };

  if (btnListenDecodrTe) {
    btnListenDecodrTe.addEventListener('click', () => {
      if (!activeDecodrData || !activeDecodrData.plainMeaning || !activeDecodrData.plainMeaning.telugu) return;
      window.speechEngine.speak(activeDecodrData.plainMeaning.english, 'en-US');
    });
  }

  if (btnCopyCounterScript) {
    btnCopyCounterScript.addEventListener('click', () => {
      const scriptEl = document.getElementById('decodrScriptText');
      const script = scriptEl ? scriptEl.textContent : '';
      if (script) {
        navigator.clipboard.writeText(script);
        window.showToast('Response email copied to clipboard!', 'success');
      }
    });
  }

  // =========================================================================
  // MODULE 4: DMVREADY (Driver's License Document Auditor)
  // =========================================================================
  const btnAuditDMV = document.getElementById('btnAuditDMV');
  const dmvVisaSelect = document.getElementById('dmvVisaSelect');
  const dmvStateSelect = document.getElementById('dmvStateSelect');
  const dmvResult = document.getElementById('dmvResult');

  if (btnAuditDMV) {
    btnAuditDMV.addEventListener('click', async () => {
      const visa = dmvVisaSelect.value;
      const state = dmvStateSelect.value;
      const data = await window.geminiService.auditDMV(visa, state);
      renderDMVResult(data);
      dmvResult.classList.remove('hidden');
      window.showToast('DMV checklist updated for your visa category!', 'success');
      initIcons();
    });

    // Auto-update when user changes visa type or state
    if (dmvVisaSelect) {
      dmvVisaSelect.addEventListener('change', () => {
        btnAuditDMV.click();
      });
    }
    if (dmvStateSelect) {
      dmvStateSelect.addEventListener('change', () => {
        btnAuditDMV.click();
      });
    }

    // Initial audit so data is populated right away
    btnAuditDMV.click();
  }

  const renderDMVResult = (data) => {
    const container = document.getElementById('dmvDocsList');
    container.innerHTML = (data.requiredDocuments || []).map(doc => `
      <div class="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all">
        <div class="flex items-start gap-3">
          <input type="checkbox" class="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300">
          <div class="space-y-1 text-xs">
            <span class="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">${doc.category}</span>
            <h5 class="font-bold text-slate-900 text-sm">${doc.docName}</h5>
            <p class="font-telugu text-slate-600">${doc.docTe}</p>
            <p class="text-amber-800 bg-amber-50 p-2 rounded border border-amber-200 mt-1 font-medium">💡 <strong>Crucial Tip:</strong> ${doc.tip}</p>
          </div>
        </div>
      </div>
    `).join('');

    document.getElementById('dmvCounterScriptText').textContent = data.counterScript;
  };

  const btnCopyDmvScript = document.getElementById('btnCopyDmvScript');
  if (btnCopyDmvScript) {
    btnCopyDmvScript.addEventListener('click', () => {
      const scriptEl = document.getElementById('dmvCounterScriptText');
      const script = scriptEl ? scriptEl.textContent : '';
      if (script) {
        navigator.clipboard.writeText(script);
        window.showToast('Counter script copied to clipboard!', 'success');
      }
    });
  }

  // Initial load
  initIcons();
});
