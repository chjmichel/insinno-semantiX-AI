const content=document.getElementById('content');
const pageTitle=document.getElementById('pageTitle');
const pageSubtitle=document.getElementById('pageSubtitle');
const workspaceSelect=document.getElementById('workspaceSelect');
const adminNav=document.getElementById('adminNav');
const onboardingNav=document.getElementById('onboardingNav');
const primaryAction=document.getElementById('primaryAction');
const simulateBtn=document.getElementById('simulateBtn');

const meta={
 'admin-dashboard':['Canonical Maintenance','Zentrales Datenmodell verwalten, stabil halten und Änderungen kontrolliert ausrollen.','New Entity'],
 'entities':['Canonical Entities','Entitäten, Attribute und fachliche Bedeutung des zentralen Modells.','New Entity'],
 'relations':['Relations','Beziehungen als eigenständige, versionierte Canonical Contracts pflegen.','Add Relation'],
 'attributes':['Attributes & Semantics','Semantische Bedeutung zentral definieren und Wiederverwendung fördern.','New Attribute'],
 'versions':['Versions & Changes','Kompatibilität, Migrationen und Lifecycle des Canonical Modells steuern.','Create Draft'],
 'quality':['Quality & Conflicts','Drift, semantische Konflikte und strukturelle Abweichungen früh erkennen.','Run Validation'],
 'onboarding-start':['New Use Case Onboarding','Neuen Use Case fachlich erfassen und gezielt auf das zentrale Canonical ausrichten.','Save Draft'],
 'source-model':['Source Data Model','Lokales Datenmodell des Use Cases erfassen oder importieren.','Add Entity'],
 'mapping':['Canonical Mapping','Lokale Entitäten und Felder auf das zentrale Canonical abbilden.','Auto Map'],
 'validation':['Mapping Validation','Strukturelle, semantische und versionale Kompatibilität prüfen.','Run Validation'],
 'publish':['Publish Mapping Contract','Versionierten Mapping Contract für Runtime und Governance veröffentlichen.','Publish']
};

function show(view){
  const tpl=document.getElementById(view); if(!tpl)return;
  content.innerHTML=''; content.appendChild(tpl.content.cloneNode(true));
  const [t,s,a]=meta[view]; pageTitle.textContent=t; pageSubtitle.textContent=s; primaryAction.textContent=a;
  document.querySelectorAll('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.view===view));
  content.querySelectorAll('[data-next]').forEach(btn=>btn.addEventListener('click',()=>show(btn.dataset.next)));
  const pub=document.getElementById('publishBtn'); if(pub) pub.addEventListener('click',()=>{document.getElementById('publishSuccess').classList.remove('hidden'); setTimeout(()=>document.getElementById('publishSuccess')?.classList.add('hidden'),3200)});
}

document.querySelectorAll('.nav-item').forEach(btn=>btn.addEventListener('click',()=>show(btn.dataset.view)));
workspaceSelect.addEventListener('change',()=>{
  const onboard=workspaceSelect.value==='onboarding';
  adminNav.classList.toggle('hidden',onboard); onboardingNav.classList.toggle('hidden',!onboard);
  simulateBtn.classList.toggle('hidden',onboard);
  show(onboard?'onboarding-start':'admin-dashboard');
});
primaryAction.addEventListener('click',()=>alert(primaryAction.textContent+' – prototype action'));
simulateBtn.addEventListener('click',()=>alert('Simulated canonical change: Contract.partner embedded → Party relation. 3 mappings affected.'));
show('admin-dashboard');
