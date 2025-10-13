
export const characters = [
  {
    id: 'sarah',
    name: 'Sarah',
    role: 'Senior Copywriter',
    personality: 'Perfezionista e metodica, ma tende a stressarsi sotto pressione',
    stress: 3,
    availability: true
  },
  {
    id: 'marco',
    name: 'Marco',
    role: 'Designer Creativo',
    personality: 'Spontaneo e veloce, ma a volte trascura i dettagli',
    stress: 2,
    availability: true
  },
  {
    id: 'elena',
    name: 'Elena',
    role: 'Sviluppatrice Frontend',
    personality: 'Pragmatica e affidabile, ma rigida sui tempi tecnici',
    stress: 2,
    availability: false
  },
  {
    id: 'antonio',
    name: 'Antonio',
    role: 'Account Director',
    personality: 'Diplomatico ma esigente sui risultati',
    stress: 4,
    availability: true
  }
];

export const gameScenes = {
  intro: {
    id: 'intro',
    title: 'Venerdì ore 17:30 - L\'Email Che Cambia Tutto',
    description: `Stai per lasciare l'ufficio quando ricevi un'email urgente dal cliente più importante dell'agenzia:

"Ciao, ho appena saputo che il nostro CEO presenterà la campagna lunedì mattina invece che mercoledì. Abbiamo bisogno di tutto pronto entro domenica sera. So che è una richiesta dell'ultimo minuto, ma è fondamentale per noi."

Il progetto è complesso: landing page, contenuti social e video promozionale. Normalmente servirebbe una settimana, tu ne hai due giorni.`,
    choices: [
      {
        id: 'panic',
        text: 'Chiamare immediatamente tutto il team per una riunione d\'emergenza',
        consequence: 'Il team si raduna velocemente ma tutti sembrano stressati',
        nextScene: 'teamMeeting',
        statsImpact: { teamMorale: -1, clientSatisfaction: 1, workQuality: 0, timeManagement: 1 }
      },
      {
        id: 'analyze',
        text: 'Prenderti 30 minuti per analizzare il progetto e fare un piano',
        consequence: 'Hai una visione più chiara, ma il tempo stringe',
        nextScene: 'planning',
        statsImpact: { teamMorale: 0, clientSatisfaction: 0, workQuality: 2, timeManagement: -1 }
      },
      {
        id: 'negotiate',
        text: 'Chiamare il cliente per discutere alternative o priorità',
        consequence: 'Il cliente ascolta ma sembra impaziente',
        nextScene: 'clientCall',
        statsImpact: { teamMorale: 1, clientSatisfaction: -1, workQuality: 1, timeManagement: 0 }
      }
    ]
  },

  teamMeeting: {
    id: 'teamMeeting',
    title: 'Riunione d\'Emergenza - Team Room',
    character: 'sarah',
    description: `Il team si è riunito nella sala meeting. Sarah sembra già nervosa, Marco sta scarabocchiando idee e Elena partecipa da remoto sembrando poco convinta.

"Okay ragazzi," inizii, "so che è venerdì sera, ma abbiamo una situazione. Il cliente ha anticipato la deadline di due giorni."

Sarah interviene: "Ma è impossibile! Io ho bisogno di almeno due giorni solo per i testi, figuriamoci le revisioni..."

Marco alza lo sguardo: "Possiamo fare qualcosa di più semplice, no? Meno elementi ma più d'impatto?"

Elena dalla videochiamata: "Il mio weekend era già pianificato. Posso lavorare domenica sera, ma non prima."`,
    choices: [
      {
        id: 'motivate',
        text: 'Motivare il team: "So che è difficile, ma ce la faremo insieme"',
        consequence: 'Il team sembra più unito ma ancora preoccupato',
        nextScene: 'workPlan',
        statsImpact: { teamMorale: 2, clientSatisfaction: 0, workQuality: 0, timeManagement: 0 }
      },
      {
        id: 'realistic',
        text: 'Essere realistici: "Dobbiamo rivedere le priorità e semplificare"',
        consequence: 'Il team apprezza l\'onestà',
        nextScene: 'prioritization',
        statsImpact: { teamMorale: 1, clientSatisfaction: -1, workQuality: 1, timeManagement: 1 }
      },
      {
        id: 'pressure',
        text: 'Fare pressione: "Non abbiamo scelta, dobbiamo farcela"',
        consequence: 'Il team accetta ma l\'atmosfera si fa tesa',
        nextScene: 'stressedTeam',
        statsImpact: { teamMorale: -2, clientSatisfaction: 1, workQuality: -1, timeManagement: 2 }
      }
    ]
  },

  planning: {
    id: 'planning',
    title: 'Analisi e Pianificazione - Il Tuo Ufficio',
    description: `Ti siedi alla scrivania e analizzi il progetto pezzo per pezzo. Prendi carta e penna e inizi a fare una lista:

• Landing page: 2 giorni di sviluppo + 1 giorno di contenuti
• Social content: 1 giorno di copy + 1 giorno di design  
• Video promozionale: 2 giorni di produzione

Totale stimato: 5 giorni. Disponibili: 2 giorni.

Realizzi che servirà un approccio completamente diverso. Mentre rifletti, arriva un messaggio da Antonio: "Ho sentito dell'urgenza. Posso aiutare con il cliente se serve negoziare."`,
    choices: [
      {
        id: 'mvp',
        text: 'Creare un piano MVP: versioni semplificate di tutto',
        consequence: 'Un approccio razionale ma rischioso',
        nextScene: 'mvpApproach',
        statsImpact: { teamMorale: 0, clientSatisfaction: 0, workQuality: -1, timeManagement: 2 }
      },
      {
        id: 'focus',
        text: 'Focalizzarsi sulla landing page e rimandare il resto',
        consequence: 'Più fattibile ma il cliente potrebbe non essere contento',
        nextScene: 'focusStrategy',
        statsImpact: { teamMorale: 1, clientSatisfaction: -2, workQuality: 2, timeManagement: 1 }
      },
      {
        id: 'antonio',
        text: 'Coinvolgere Antonio per rinegoziare con il cliente',
        consequence: 'Potrebbe funzionare ma mostra che non gestisci la situazione',
        nextScene: 'antonioHelp',
        statsImpact: { teamMorale: 0, clientSatisfaction: 1, workQuality: 0, timeManagement: -1 }
      }
    ]
  },

  clientCall: {
    id: 'clientCall',
    title: 'Telefonata con il Cliente - Negoziazione',
    description: `"Ciao, grazie per aver chiamato subito," dice il cliente. "So che è una richiesta impossibile, ma il nostro CEO è molto esigente..."

"Capisco perfettamente," rispondi. "Vorrei essere sicuro di consegnare qualcosa di qualità. Possiamo discutere le priorità? Cosa è assolutamente imprescindibile per la presentazione di lunedì?"

"Beh, sicuramente la landing page. Per i social potremmo arrangiarci con quello che abbiamo. Il video... sarebbe fantastico ma forse non è vitale."

Senti un'apertura nella sua voce. Forse c'è spazio per negoziare.`,
    choices: [
      {
        id: 'negotiate_timeline',
        text: 'Proporre una consegna graduale: landing page domenica, resto martedì',
        consequence: 'Il cliente sembra considerare l\'opzione',
        nextScene: 'partialSuccess',
        statsImpact: { teamMorale: 2, clientSatisfaction: 0, workQuality: 2, timeManagement: 1 }
      },
      {
        id: 'commit_all',
        text: 'Promettere di consegnare tutto: "Ce la faremo"',
        consequence: 'Il cliente è entusiasta ma ora sei sotto pressione totale',
        nextScene: 'overCommitment',
        statsImpact: { teamMorale: -1, clientSatisfaction: 3, workQuality: -1, timeManagement: -2 }
      },
      {
        id: 'suggest_alternative',
        text: 'Suggerire un approccio creativo alternativo più veloce',
        consequence: 'Il cliente è incuriosito ma scettico',
        nextScene: 'creativeRisk',
        statsImpact: { teamMorale: 1, clientSatisfaction: -1, workQuality: 0, timeManagement: 1 }
      }
    ]
  },

  workPlan: {
    id: 'workPlan',
    title: 'Sabato Mattina - Piano di Battaglia',
    character: 'marco',
    description: `È sabato mattina e il team è in ufficio. L'energia è buona ma tutti sanno che sarà una sfida. State definendo il piano di lavoro quando Marco propone: "E se facessimo tutto in stile minimal? Meno elementi, più impatto. Potrei avere la pagina pronta per questo pomeriggio."

Sarah però interviene: "I testi minimal sono più difficili da scrivere, non più facili. Ogni parola deve essere perfetta."

Elena aggiunge: "Se andiamo minimal posso accelerare lo sviluppo, ma dovremo decidere tutto subito. Niente cambi in corso d'opera."

Senti che è il momento di una decisione importante.`,
    choices: [
      {
        id: 'minimal_risk',
        text: 'Abbracciare completamente l\'approccio minimal',
        consequence: 'Il team si concentra ma la pressione è alta',
        nextScene: 'minimalChallenge',
        statsImpact: { teamMorale: 0, clientSatisfaction: 1, workQuality: 1, timeManagement: 2 }
      },
      {
        id: 'hybrid',
        text: 'Proporre un approccio ibrido: minimal per alcuni elementi',
        consequence: 'Più sicuro ma potrebbe creare confusione',
        nextScene: 'hybridApproach',
        statsImpact: { teamMorale: 1, clientSatisfaction: 0, workQuality: 0, timeManagement: 0 }
      },
      {
        id: 'traditional',
        text: 'Rimanere sull\'approccio tradizionale ma accelerato',
        consequence: 'Familiare ma molto rischioso sui tempi',
        nextScene: 'timeChallenge',
        statsImpact: { teamMorale: -1, clientSatisfaction: 2, workQuality: 2, timeManagement: -2 }
      }
    ]
  },

  minimalChallenge: {
    id: 'minimalChallenge',
    title: 'Sabato Pomeriggio - La Sfida Minimal',
    character: 'sarah',
    description: `Sono le 15:00 e l'approccio minimal sta funzionando meglio del previsto. Marco ha creato un design pulito e d'impatto, Elena sta sviluppando velocemente, ma Sarah è in difficoltà.

"Non riesco a trovare le parole giuste," confessa. "Avere solo 20 parole per spiegare tutto il prodotto è... paralizzante. E se sbaglio il tono?"

Il cliente ha appena mandato un messaggio: "Sono curioso di vedere l'anteprima. Posso avere qualcosa entro stasera?"

Marco sussurra: "Potremmo mostrargli il design senza i testi finali..."`,
    choices: [
      {
        id: 'support_sarah',
        text: 'Dare tempo a Sarah e lavorare insieme sui testi',
        consequence: 'Sarah si sente supportata ma perdete tempo',
        nextScene: 'teamwork',
        statsImpact: { teamMorale: 2, clientSatisfaction: -1, workQuality: 2, timeManagement: -1 }
      },
      {
        id: 'show_partial',
        text: 'Mostrare l\'anteprima parziale al cliente',
        consequence: 'Il cliente vede il progresso ma potrebbe non essere convinto',
        nextScene: 'partialDemo',
        statsImpact: { teamMorale: 0, clientSatisfaction: 0, workQuality: -1, timeManagement: 1 }
      },
      {
        id: 'take_over',
        text: 'Prendere in mano i testi per accelerare',
        consequence: 'Vai veloce ma Sarah si sente esclusa',
        nextScene: 'soloEffort',
        statsImpact: { teamMorale: -1, clientSatisfaction: 1, workQuality: 0, timeManagement: 2 }
      }
    ]
  },

  partialDemo: {
    id: 'partialDemo',
    title: 'Sabato Sera - Anteprima per il Cliente',
    description: `Alle 19:00 organizzi una videocall con il cliente per mostrare l'anteprima. Il design minimal colpisce immediatamente: "Wow, questo è completamente diverso da quello che mi aspettavo, ma... mi piace!"

Tuttavia, quando arriva ai testi placeholder, la sua espressione cambia: "Hmm, ma i contenuti? Come comunichiamo i benefici del prodotto con così poche parole?"

Marco e Elena ti guardano aspettando la tua risposta. Sarah è collegata ma rimane in silenzio, ancora lavorando sui testi.`,
    choices: [
      {
        id: 'explain_concept',
        text: 'Spiegare la filosofia minimal e come sarà efficace',
        consequence: 'Il cliente sembra convinto ma vuole vedere i testi finali',
        nextScene: 'clientBuyIn',
        statsImpact: { teamMorale: 1, clientSatisfaction: 1, workQuality: 1, timeManagement: 0 }
      },
      {
        id: 'promise_content',
        text: 'Promettere contenuti più ricchi entro domani',
        consequence: 'Il cliente è contento ma ora devi mantenere la promessa',
        nextScene: 'contentPressure',
        statsImpact: { teamMorale: -1, clientSatisfaction: 2, workQuality: -1, timeManagement: -1 }
      },
      {
        id: 'involve_client',
        text: 'Coinvolgere il cliente nella definizione del messaggio',
        consequence: 'Approccio collaborativo ma rischioso',
        nextScene: 'collaborativeApproach',
        statsImpact: { teamMorale: 0, clientSatisfaction: 1, workQuality: 0, timeManagement: -1 }
      }
    ]
  },

  teamwork: {
    id: 'teamwork',
    title: 'Domenica Mattina - Il Power del Team',
    description: `Domenica mattina, 9:00. Hai passato la serata di sabato lavorando con Sarah sui testi. La collaborazione ha dato frutti inaspettati: avete trovato un linguaggio che è sia minimal che efficace.

Marco entra in ufficio con due caffè: "Come andiamo? Ho avuto un'idea per il video durante la notte... cosa ne dite se facciamo solo una gif animata invece del video? Stesso impatto, meno tempo."

Elena, collegata da casa: "Se Marco fa una gif, posso integrarla nella landing page in mezz'ora. Potremmo avere tutto pronto per pranzo."

Il team sembra energico e creativo. Forse ce la farete davvero.`,
    choices: [
      {
        id: 'full_steam',
        text: 'Andare a tutto gas: "Facciamolo, completiamo tutto!"',
        consequence: 'Energia alta ma rischio di burnout',
        nextScene: 'finalSprint',
        statsImpact: { teamMorale: 1, clientSatisfaction: 2, workQuality: 1, timeManagement: 1 }
      },
      {
        id: 'quality_check',
        text: 'Mantenere il focus sulla qualità con revisioni accurate',
        consequence: 'Più lento ma più sicuro',
        nextScene: 'qualityFirst',
        statsImpact: { teamMorale: 0, clientSatisfaction: 1, workQuality: 3, timeManagement: -1 }
      },
      {
        id: 'backup_plan',
        text: 'Preparare un piano B nel caso qualcosa vada storto',
        consequence: 'Prudente ma divide l\'attenzione',
        nextScene: 'contingencyPlan',
        statsImpact: { teamMorale: -1, clientSatisfaction: 0, workQuality: 1, timeManagement: 0 }
      }
    ]
  },

  finalSprint: {
    id: 'finalSprint',
    title: 'Domenica Pomeriggio - La Resa dei Conti',
    character: 'elena',
    description: `Ore 16:00. Il team sta lavorando a ritmo serrato. La landing page è quasi pronta, i testi sono perfetti, la gif di Marco è geniale. Tutto sembra andare per il verso giusto quando...

"ERRORE 404," grida Elena. "Il server di staging è andato giù. Non riesco a caricare nulla!"

Marco si ferma: "Cosa significa?"

Elena sembra panica: "Significa che tutto il lavoro è sul mio computer ma non posso farlo vedere al cliente. Il server tornerà online solo domani mattina."

Sono le 16:30, il cliente si aspetta la consegna entro sera. Il vostro weekend di lavoro potrebbe essere stato inutile.`,
    choices: [
      {
        id: 'creative_demo',
        text: 'Creare una demo alternativa con screenshot e video',
        consequence: 'Soluzione creativa ma non ideale',
        nextScene: 'creativeSolution',
        statsImpact: { teamMorale: 1, clientSatisfaction: -1, workQuality: 0, timeManagement: 1 }
      },
      {
        id: 'honest_communication',
        text: 'Essere onesti con il cliente sul problema tecnico',
        consequence: 'Trasparente ma rischioso',
        nextScene: 'honestApproach',
        statsImpact: { teamMorale: 0, clientSatisfaction: -2, workQuality: 2, timeManagement: -1 }
      },
      {
        id: 'elena_solution',
        text: 'Supportare Elena nel trovare una soluzione tecnica',
        consequence: 'Rischioso ma potrebbe funzionare',
        nextScene: 'techSolution',
        statsImpact: { teamMorale: 2, clientSatisfaction: 0, workQuality: 1, timeManagement: -2 }
      }
    ]
  },

  creativeSolution: {
    id: 'creativeSolution',
    title: 'Domenica Sera - La Presentazione Improvvisata',
    description: `Ore 19:00. Avete improvvisato una presentazione usando screenshot, la gif di Marco, e un video fatto con il telefono che mostra la navigazione sul computer di Elena.

Il cliente risponde dopo 20 minuti: "Non è quello che mi aspettavo, ma... è incredibilmente autentico. Si vede che ci avete messo il cuore. Procediamo così, carichiamo tutto online domani mattina presto."

Marco sorride: "In realtà questo approccio è più umano della solita demo perfetta."

Sarah aggiunge: "E i testi funzionano ancora meglio in questo formato."

Elena sembra sollevata: "Domani mattina alle 8 tutto sarà online e perfetto."`,
    choices: [
      {
        id: 'celebrate',
        text: 'Celebrare il successo del team: "Ce l\'abbiamo fatta!"',
        consequence: 'Il team è unito e soddisfatto',
        nextScene: 'teamSuccess',
        statsImpact: { teamMorale: 3, clientSatisfaction: 1, workQuality: 1, timeManagement: 0 }
      },
      {
        id: 'plan_monday',
        text: 'Pianificare la giornata di lunedì per essere perfetti',
        consequence: 'Organizzati ma ancora sotto pressione',
        nextScene: 'mondayPrep',
        statsImpact: { teamMorale: 1, clientSatisfaction: 2, workQuality: 2, timeManagement: 1 }
      },
      {
        id: 'reflect',
        text: 'Riflettere su cosa abbiamo imparato da questa esperienza',
        consequence: 'Crescita personale e di team',
        nextScene: 'lessonsLearned',
        statsImpact: { teamMorale: 2, clientSatisfaction: 1, workQuality: 3, timeManagement: 0 }
      }
    ]
  },

  // ENDINGS
  teamSuccess: {
    id: 'teamSuccess',
    title: 'SUCCESSO - Il Potere del Team',
    description: `Lunedì mattina la presentazione è un trionfo. Il CEO del cliente è entusiasta dell'approccio creativo e autentico. "Non avevo mai visto una presentazione così coinvolgente," dice.

Il vostro team è diventato più forte attraverso la sfida. Sarah ha scoperto di poter scrivere sotto pressione, Marco ha dimostrato la sua versatilità, Elena ha risolto problemi impossibili, e tu hai guidato tutto con empatia e creatività.

Antonio ti chiama: "Complimenti, hai gestito una situazione impossibile e ne è uscito qualcosa di straordinario. Il cliente ha chiesto specificamente di lavorare ancora con voi."

**COMPETENZE DIMOSTRATE:**
✅ Leadership empatica
✅ Gestione dello stress
✅ Problem solving creativo
✅ Team building
✅ Comunicazione efficace`,
    choices: [],
    isEnding: true,
    endingType: 'success'
  },

  lessonsLearned: {
    id: 'lessonsLearned',
    title: 'CRESCITA - L\'Esperienza che Forma',
    description: `La presentazione va bene, non perfetta, ma il cliente apprezza l'onestà e la trasparenza del processo. Più importante, tu e il team avete imparato lezioni preziose.

"Sai cosa?" dice Sarah, "questa esperienza mi ha insegnato che posso essere creativa anche sotto pressione."

Marco aggiunge: "E io ho capito che le limitazioni spesso portano alle idee migliori."

Elena conclude: "La prossima volta saremo preparati per qualunque emergenza tecnica."

Tu hai imparato che essere un leader significa supportare il team e crescere insieme, non solo raggiungere gli obiettivi.

**COMPETENZE DIMOSTRATE:**
✅ Capacità di apprendimento
✅ Resilienza
✅ Coaching del team
✅ Pensiero strategico
✅ Crescita personale`,
    choices: [],
    isEnding: true,
    endingType: 'creative'
  },

  overCommitment: {
    id: 'overCommitment',
    title: 'BURNOUT - La Promessa Impossibile',
    description: `Domenica sera, ore 23:00. Il team è esausto. Avete lavorato 18 ore al giorno ma non ce la fate. La qualità è scadente, tutti sono stressati, e domani mattina dovrete presentare qualcosa che non vi rappresenta.

Sarah non ti parla più, Marco ha fatto tre versioni diverse del design ed è confuso, Elena ha lavorato tutta la notte e ha introdotto bug nel codice.

Il cliente riceve il lavoro e risponde: "Non è quello che mi aspettavo. Sembra fatto di fretta."

Antonio ti convoca: "Capisco la pressione, ma abbiamo promesso qualcosa che non potevamo mantenere. Dobbiamo rivedere come gestiamo queste situazioni."

**AREE DI MIGLIORAMENTO:**
❌ Gestione delle aspettative
❌ Realismo nella pianificazione
❌ Cura del benessere del team
❌ Controllo della qualità
❌ Comunicazione sotto stress`,
    choices: [],
    isEnding: true,
    endingType: 'burnout'
  }
};
